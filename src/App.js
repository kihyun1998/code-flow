import { 
    applyEdgeChanges, 
    applyNodeChanges,
    addEdge,
    updateEdge
} from 'reactflow';

import {
    ConfigProvider,
    theme,
    FloatButton,
    Button
}from "antd";

import koKR from 'antd/lib/locale/ko_KR';


import { ThemeProvider } from 'styled-components';

import 'reactflow/dist/style.css';
import './App.css';

import { MdDarkMode,MdOutlineLightMode } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai"
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
    

    // 엣지 제거를 위한 함수 1
    const onEdgeUpdateStart = useCallback(()=>{
        edgeUpdateSuccessful.current = false;
    },[]);

    // 엣지 제거를 위한 함수 2
    const onEdgeUpdate = useCallback((oldEdge, newConnection)=>{
        edgeUpdateSuccessful.current = true;
        setEdges((els) => updateEdge(oldEdge, newConnection,els));
    },[]);

    // 엣지 제거를 위한 함수 3
    const onEdgeUpdateEnd = useCallback((_, edge)=>{
        if(!edgeUpdateSuccessful.current){
            setEdges((eds)=>eds.filter((e)=>e.id !== edge.id));
        }
    },[]);
    


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


    // 테마 설정
    // antd
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { defaultAlgorithm, darkAlgorithm } = theme;

    //react-flow
    const [mode, setMode] = useState('light');
    const flowTheme = mode === 'light' ? lightTheme : darkTheme;


    const toggleDark = () => {
        setIsDarkMode((previousValue) => !previousValue);
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    }
    

    // const toggleMode = () => {
    //     setMode((m) => (m === 'light' ? 'dark' : 'light'));
    // };

    return (
        <div className="App" style={{width:'100%', height:'100vh'}}>
            <ConfigProvider locale={koKR} theme={{
                algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
            }}>
                

                <ThemeProvider theme={flowTheme}>
                    <div className='bar'>
                        <Button onClick={addNode}>
                            <BsDatabaseAdd/>
                        </Button>

                        <Button onClick={saveJson}>
                            <AiOutlineSave/>
                        </Button>
                        
                        
                        <FloatButton
                            icon={ isDarkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}
                            onClick={toggleDark}
                        />
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

            </ConfigProvider>
            
        </div>
    );
}

export default App;
