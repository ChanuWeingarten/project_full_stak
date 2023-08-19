import React from 'react';
import { BrowserRouter } from 'react-router-dom' 
import Main from './components/Main';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
//import LogIn from './components/LogIn';

function App() {
  return (

    <BrowserRouter>
      <div className="App">
       
       <Main></Main>
      </div>
    </BrowserRouter>

  );
}

export default App;
