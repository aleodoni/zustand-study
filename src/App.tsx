import React, { useCallback } from 'react';
import useStore from './stores/store';

function App() {
  const {bears, increasePopulation, removeAllBears, gitHubUserInfo, userInfo, logradouro} = useStore();

  const getData = useCallback(async () => {
    await Promise.all([
      gitHubUserInfo(),
      ])
  }, [gitHubUserInfo]);

  return (
    <>
    <h1>Hello World</h1>
    <p>Bears:{bears}</p>
    <p>{userInfo.name}</p>
    <p>{logradouro.logradouro}</p>

    <button type="button" onClick={increasePopulation}>INCREASE</button>
    <button type="button" onClick={removeAllBears}>REMOVE ALL</button>
    <button type="button" onClick={getData}>GITHUB</button>
    </>
  );
}

export default App;
