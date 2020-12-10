import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MyContextProvider from "./contexts/MyContext";

ReactDOM.render(
    <BrowserRouter>
        <MyContextProvider>
            <App />
        </MyContextProvider>
    </BrowserRouter>,
    document.getElementById('root'));