import { 
    applyEdgeChanges, 
    applyNodeChanges,
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
import { nodes as nodesData,edges as edgesData } from './data/data';
//https://reactflow.dev/docs/examples/styling/styled-components/
//https://reactflow.dev/docs/guides/theming/




const fs = window.require('fs');

const { app } = window.require('@electron/remote');

// 홈 디렉토리 경로
const homePath = `${app.getPath('home')}/.erd/`;
// JSON 파일 저장 경로
const jsonDataPath = `${homePath}/jsonData.json`

const getNodeId = () => `${String(+new Date()).slice(6)}`;


function App() {

    const [mode, setMode] = useState('light');
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleMode = () => {
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };

    const initialNodes = useRef(nodesData);
    const initialEdges = useRef(edgesData);

    // 노드에 관한 state
    const [updateNodes,setNodes] = useState(initialNodes.current);
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
            setNodes((updateNodes)=>{
                return[
                    ...updateNodes,
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

    const saveJson = ()=>{
        // 폴더 없다면 생성
        !fs.existsSync(homePath) && fs.mkdirSync(homePath);
        const updateNodesData = {
            nodes:updateNodes,
            edges:edges,
        }
        fs.writeFileSync(jsonDataPath,JSON.stringify(updateNodesData, null, 4));
    }

    const showedge = () => {
        console.log(edges)
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

                    <CustomButton onClick={saveJson}>
                        save
                    </CustomButton>

                    <CustomButton onClick={showedge}>
                        E
                    </CustomButton>
                    
                </div>
                <Flow updateNodes={updateNodes}  edges={edges} setEdges={setEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}/>
                
                
                
            </ThemeProvider>
        </div>
    );
}

export default App;
