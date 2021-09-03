import React,{Component} from 'react'
import './App.css';
import Main from './components/mainComponent.jsx';
import { BrowserRouter } from 'react-router-dom';


import {Provider} from 'react-redux';
import {configStore} from './redux/createStore'

const store=configStore()
class App extends Component {

  
  render(){
    return (
      
     <div className="" >
       <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
       </Provider>
     </div>
    );
  }
  
}

export default App;
