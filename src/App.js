import { ThemeProvider } from 'styled-components';

import 'reactflow/dist/style.css';
import './App.css';


import { HiOutlineSun,HiOutlineMoon } from 'react-icons/hi';
import { BsDatabaseAdd } from 'react-icons/bs'

import React, { useState } from 'react';

import FlowExample from './component/FlowExample';
import { darkTheme, lightTheme } from './custom-component/theme';
import CustomButton from './custom-component/CustomButton';
import data from './data/nodes.json'

//https://reactflow.dev/docs/examples/styling/styled-components/
//https://reactflow.dev/docs/guides/theming/


const getNodeId = () => `${String(+new Date()).slice(6)}`;

// const onAdd = () => {
//     const id = getNodeId();
//     const newNode = {
//         id,
//         data: { label: `${id}` },
//         position: {
//             x: 0,
//             y: 0 + (nodes.length + 1) * 20
//         },
//         type: 'custom',
//     };
//         setNodes((nds) => nds.concat(newNode));
//   };


const jsonArr = data.nodes.map(node => ({
    id: node.id,
    data: { label: node.data.label },
    position: {
        x: node.position.x,
        y: node.position.y
    },
    type: node.type
}));

const addNode = () => {
    
}


function App() {

    const [mode, setMode] = useState('light');
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleMode = () => {
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="App" style={{width:'100%', height:'100vh'}}>
            {console.log(jsonArr)}
            <ThemeProvider theme={theme}>
                <div className='bar'>
                    <CustomButton onClick={toggleMode}>
                        {
                            mode === 'light' ? <HiOutlineSun/> : <HiOutlineMoon/>
                        }
                    </CustomButton>
                        
                    <CustomButton>
                        <BsDatabaseAdd onClick={}/>
                    </CustomButton>
                </div>
                <FlowExample/>
                
                
                
            </ThemeProvider>
        </div>
    );
}

export default App;
