import React from 'react'
import Header from './components/Header'
import Routes from './routes'
import './index.css'

const App = () => {
    return (
      <div className="App">
          <Header />
          <Routes />
      </div>
    );
  }
  
  export default App;