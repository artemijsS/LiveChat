import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from "./redux/store";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './Components/alertTemlate';

// optional configuration
const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    background: '#2f9688',
    // you can also just use 'scale'
    transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
              <App />
          </AlertProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);