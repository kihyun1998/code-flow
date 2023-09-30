import { 
    applyEdgeChanges, 
    applyNodeChanges
} from 'reactflow';

import { ThemeProvider } from 'styled-components';

import 'reactflow/dist/style.css';
import './App.css';


import { HiOutlineSun,HiOutlineMoon } from 'react-icons/hi';
import { BsDatabaseAdd } from 'react-icons/bs'

import React, { useState, useCallback,useRef } from 'react';

import Flow from './component/Flow';
import { darkTheme, lightTheme } from './custom-component/theme';
import CustomButton from './custom-component/CustomButton';
import data from './data/nodes.json'
import { nodes as nodesData,edges as edgesData } from './data/data';
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




function App() {

    const [mode, setMode] = useState('light');
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleMode = () => {
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };

    const initialNodes = useRef(nodesData);
    const initialEdges = useRef(edgesData);

    // 노드에 관한 state
    const [nodes,setNodes] = useState(initialNodes.current);
    // 간선에 관한 state
    const [edges, setEdges] = useState(initialEdges.current);

    const yPos = useRef(0);

    // Flow와 함께 사용한다면 밑 코드 사용 가능
    // const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // node can click & drag
    const onNodesChange = useCallback(
        (changes) => setNodes(
            (nds)=>applyNodeChanges(changes,nds)
        ),[]
    );

    // node drag 시 edge도 따라가야되서(maybe?)
    const onEdgesChange = useCallback(
        (changes) => setNodes(
            (nds) => applyEdgeChanges(changes,nds)
        ),[]
    );


    const addNode = useCallback(
        ()=>{
            yPos.current += 50;
            setNodes((nodes)=>{
                return[
                    ...nodes,
                    {
                        id: getNodeId(),
                        data: {
                            label:"New Node"
                        },
                        position: {
                            x:50,
                            y: yPos.current
                        },
                        type: "custom"
                    }
                ]
            })
        },[]
    );

    const checkNodes = ()=>{
        console.log("current : ",nodes)
        console.log("initial : ",initialNodes.current)
    }

    return (
        <div className="App" style={{width:'100%', height:'100vh'}}>
            <ThemeProvider theme={theme}>
                <div className='bar'>
                    <CustomButton onClick={toggleMode}>
                        {
                            mode === 'light' ? <HiOutlineSun/> : <HiOutlineMoon/>
                        }
                    </CustomButton>
                        
                    <CustomButton>
                        <BsDatabaseAdd onClick={addNode}/>
                    </CustomButton>

                    <CustomButton onClick={checkNodes}>
                        N
                    </CustomButton>
                    
                </div>
                <Flow nodes={nodes}  edges={edges} setEdges={setEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} />
                
                
                
            </ThemeProvider>
        </div>
    );
}

export default App;
