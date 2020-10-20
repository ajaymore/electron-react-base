import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
const ipcRenderer = require("electron").ipcRenderer;

function App() {

  useEffect(()=>{
    const ipcRenderer = require("electron").ipcRenderer;
    function trigger(){
        ipcRenderer.send("RENDERER_MESSAGE", { type: "PING" });
        ipcRenderer.on("MAIN_STATE_UPDATE", function (event:any, data:any) {
            console.log('received back',event,data);
        });
    }
    trigger();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
