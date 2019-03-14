import React, { Component } from 'react';
import logo from './logo.svg';
import FancyBorder from './components/header';
import FrontPage from './components/FrontPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FancyBorder/>
          <div className="main-div">
              <FrontPage/>
          </div>
      </div>
    );
  }
}

export default App;
