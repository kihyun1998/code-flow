import ReactFlow  from 'reactflow';
import styled, { ThemeProvider } from 'styled-components';
import 'reactflow/dist/style.css';
import './App.css';
import React from 'react';
import { useState, useCallback } from 'react';
import FlowExample from './component/FlowExample';
import { darkTheme, lightTheme } from './style-component/theme';
import CustomButton from './style-component/CustomButton';

//https://reactflow.dev/docs/examples/styling/styled-components/
//https://reactflow.dev/docs/guides/theming/
function App() {

    const [mode, setMode] = useState('light');
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleMode = () => {
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };
    return (
        <div className="App" style={{width:'100%', height:'100vh'}}>
            <ThemeProvider theme={theme}>
                <div className='bar'>
                    <CustomButton></CustomButton>
                    <button className='btn-theme' onClick={toggleMode}>switch mode</button>
                </div>
                <FlowExample/>
                
                
            </ThemeProvider>
        </div>
    );
}

export default App;
