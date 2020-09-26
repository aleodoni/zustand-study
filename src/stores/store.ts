import create from 'zustand';
import axios, { AxiosResponse } from 'axios';
import produce from 'immer';

type UserInfo = {
  login: string;
  id: number;
  name: string;
  company: string;
}

type Logradouro = {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
}

type State = {
  bears: number,
  userInfo: UserInfo,
  logradouro: Logradouro;
  increasePopulation: () => void,
  removeAllBears: () => void,
  gitHubUserInfo: () => Promise<void>,
  getLogradouro: () => Promise<void>,
}

const useStore = create<State>((set, get) => ({
  bears: 0,
  userInfo: {} as UserInfo,
  logradouro: {} as Logradouro,
  increasePopulation: () => set(state => ({ bears: state.bears + 1})),
  removeAllBears: () => set({bears: 0}),
  gitHubUserInfo: async () => {
    const promises = Promise.all([
      axios.get<UserInfo>('https://api.github.com/users/aleodoni'),
      axios.get('https://viacep.com.br/ws/01001000/json/')
    ])

    const [dataGithub, dataCep]:[AxiosResponse<UserInfo>, AxiosResponse<Logradouro>]= await promises;

    const filteredDataGithub = {
      id: dataGithub.data.id,
      company: dataGithub.data.company,
      name: dataGithub.data.name,
      login: dataGithub.data.login
    };

    const filteredDataCep = {
      cep: dataCep.data.cep,
      logradouro: dataCep.data.logradouro,
      bairro: dataCep.data.bairro,
      localidade: dataCep.data.localidade
    };
    
    set({ 
      userInfo: filteredDataGithub, 
      logradouro: filteredDataCep, 
    });

    const testState = produce(get(), draftState => {
      draftState.logradouro.localidade = 'Jacupiranga'
    })

    console.log(testState);
  },
  getLogradouro: async () => {
    console.log('---2');
    const responseLogradouro = await axios.get('https://viacep.com.br/ws/01001000/json/')
    console.log('---3');
    set({ logradouro: responseLogradouro.data });
  }
}))

export default useStore;