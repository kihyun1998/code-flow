import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const fs = window.require('fs');
const { app } = window.require('@electron/remote');
const homePath = `${app.getPath('home')}/.erd/`;

// 초기 디렉토리 없으면 생성
!fs.existsSync(homePath) && fs.mkdirSync(homePath);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
