import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstPanel from './container/firstPanel/FirstPanel'
import SecondPanel from './container/secondPanel/SecondPanel'
import ThirdPanel from './container/thirdPanel/ThirdPanel';

function App() {
  return (
    <div className="App">
      <div className="panel">
        <FirstPanel></FirstPanel>
      </div>
      <div className="panel">
        <SecondPanel></SecondPanel>
      </div>
      <div className="panel">
        <ThirdPanel></ThirdPanel>
      </div>
    </div>
  );
}

export default App;
