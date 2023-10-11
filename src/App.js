import { 
    applyEdgeChanges, 
    applyNodeChanges,
    addEdge,
    updateEdge
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

const fs = window.require('fs');
const { app } = window.require('@electron/remote');
// 홈 디렉토리 경로
const homePath = `${app.getPath('home')}/.erd/`;
// JSON 파일 저장 경로
const jsonDataPath = `${homePath}/jsonData.json`


function App() {
    // 엣지 수정을 위한 변수
    const edgeUpdateSuccessful = useRef(true);
    // 초기 노드
    const initialNodes = useRef(nodesData);
    //초기 엣지
    const initialEdges = useRef(edgesData);
    // 초기위치
    const yPos = useRef(0);


    const getNodeId = () => `${String(+new Date()).slice(6)}`;
    const [mode, setMode] = useState('light');
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const toggleMode = () => {
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    };

    

    // 노드에 관한 state
    const [updateNodes,setNodes] = useState(initialNodes.current);
    // 간선에 관한 state
    const [edges, setEdges] = useState(initialEdges.current);

    

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

    const onConnect = useCallback(
        (params) => setEdges(
            (els) => addEdge(params, els)
        ), []);
    

    const onEdgeUpdateStart = useCallback(()=>{
        edgeUpdateSuccessful.current = false;
    });

    const onEdgeUpdate = useCallback((oldEdge, newConnection)=>{
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection,els));
    },[]);

    const onEdgeUpdateEnd = useCallback((_, edge)=>{
        if(!edgeUpdateSuccessful.current){
            setEdges((eds)=>eds.filter((e)=>e.id !== edge.id));
        }
    })
    


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
                    
                </div>
                <Flow 
                    updateNodes={updateNodes}
                    edges={edges} 
                    setEdges={setEdges} 
                    onNodesChange={onNodesChange} 
                    onEdgesChange={onEdgesChange} 
                    onConnect={onConnect}
                    onEdgeUpdateStart={onEdgeUpdateStart}
                    onEdgeUpdate={onEdgeUpdate}
                    onEdgeUpdateEnd={onEdgeUpdateEnd}
                />
                
                
                
            </ThemeProvider>
        </div>
    );
}

export default App;
