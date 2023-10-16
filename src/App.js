import { 
    applyEdgeChanges, 
    applyNodeChanges,
    addEdge
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
import { AiOutlineSave,AiFillDelete } from "react-icons/ai"
import { BsDatabaseAdd } from 'react-icons/bs'

import React, { useState, useCallback,useRef } from 'react';

import Flow from './component/Flow';
import { darkTheme, lightTheme } from './custom-component/theme';
import { nodes as nodesData,edges as edgesData } from './data/data';

const fs = window.require('fs');
const { app } = window.require('@electron/remote');
// 홈 디렉토리 경로
const homePath = `${app.getPath('home')}/.erd/`;
// JSON 파일 저장 경로
const jsonDataPath = `${homePath}/jsonData.json`


function App() {
    // 초기 노드
    const initialNodes = useRef(nodesData);
    //초기 엣지
    const initialEdges = useRef(edgesData);
    // 초기위치
    const yPos = useRef(0);

    // 아이디 값 구하기
    const getNodeId = () => `${String(+new Date()).slice(6)}`;
    

    // 테마 설정
    // antd
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { defaultAlgorithm, darkAlgorithm } = theme;

    //react-flow
    const [mode, setMode] = useState('light');
    const flowTheme = mode === 'light' ? lightTheme : darkTheme;


    const toggleMode = () => {
        setIsDarkMode((previousValue) => !previousValue);
        setMode((m) => (m === 'light' ? 'dark' : 'light'));
    }
    
    // 노드에 관한 state
    const [ updateNodes,setNodes ] = useState(initialNodes.current);
    // 간선에 관한 state
    const [ edges, setEdges ] = useState(initialEdges.current);
    // 선택된 노드 관련 state
    const [ selectedNode, setSelectedNode ] = useState(null); 
    // 선택된 간선 고나련 state
    const [ selectedEdge, setSelectedEdge ] = useState(null);
    

    // 엣지 색상
    const clickColor = "#2073C5"
    let unClickColor = "gray"

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

    // 엣지 연결
    const onConnect = useCallback(
        (params) => setEdges(
            (els) => addEdge({
                        ...params,
                        animated: true,
                        type: "smoothstep",
                        style: { stroke: unClickColor }
                        },els)
        ), []);
    
    // 노드 추가
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


    // 파일 저장(노드, 엣지)
    const saveJson = ()=>{
        // 폴더 없다면 생성
        !fs.existsSync(homePath) && fs.mkdirSync(homePath);
        const updateNodesData = {
            nodes:updateNodes,
            edges:edges,
        }
        fs.writeFileSync(jsonDataPath,JSON.stringify(updateNodesData, null, 4));
    }



    // 노드 선택 시 selectedNode에 저장
    const onNodeClick = (event, node) => {
        // 이전 간선 선택 초기화
        setSelectedEdge(null)

        if(selectedNode != null){
            // 이전에 선택된 노드가 있다면
            if(selectedNode.id !== node.id){
                // 중복 선택이 아닐 때만 값 설정
                setSelectedNode(node);
                console.log(`click node : ${node.id}`);
            }
        }else{
            // 이전에 선택된 노드가 없다면
            setSelectedNode(node);
            console.log(`click node : ${node.id}`);
        }
        // 엣지 색 초기화
        resetEdgeColor()
    }

    // 노드 선택 시 selectedNode에 저장
    const onNodeDrag = (event, node)=> {
        // 이전 간선 선택 초기화
        setSelectedEdge(null)

        if(selectedNode != null){
            // 이전에 선택된 노드가 있다면
            if(selectedNode.id !== node.id){
                // 중복 선택이 아닐 때만 값 설정
                setSelectedNode(node);
                console.log(`drag node : ${node.id}`);
            }
        }else{
            // 이전에 선택된 노드가 없다면
            setSelectedNode(node);
            console.log(`drag node : ${node.id}`);
        }
        // 엣지 색 초기화
        resetEdgeColor()
    }

    // 배경화면 누르면 노드 선택 해제
    const onPaneClick = (event) => {
        // 노드, 간선 선택 초기화
        setSelectedNode(null)
        setSelectedEdge(null)
        // 엣지 색 초기화
        resetEdgeColor()
    }

    // 엣지 색 초기화 함수
    const resetEdgeColor = () => {
        let tmpEdges = [...edges];
        tmpEdges.forEach((elm)=>{
            elm.style = {
                stroke: unClickColor
            }
        })
        setEdges(tmpEdges);
    }

    // 간선 선택시 selectedEdge에 저장
    const onEdgeClick = (event,edge)=>{
        // 이전 노드 선택 초기화
        setSelectedNode(null)


        if(selectedEdge != null){
            // 이전에 선택된 간선이 있다면
            if(edge.id !== selectedEdge.id){
                // 중복 선택이 아닐 때만 값 설정
                setSelectedEdge(edge);

                let tmpEdges = [...edges];

                tmpEdges = tmpEdges.filter((elm)=>{
    
                    if( elm.id === edge.id ){
                        elm.style = {
                            stroke: clickColor
                        }
                        return elm;
                    }else{
                        elm.style = {
                            stroke: unClickColor
                        }
                        return elm;
                    }
                })
                setEdges(tmpEdges);
            }
        }else{
            // 이전에 선택된 간선이 없다면
            setSelectedEdge(edge);

            let tmpEdges = [...edges];

            tmpEdges = tmpEdges.filter((elm)=>{

                if( elm.id === edge.id ){
                    elm.style = {
                        stroke: clickColor
                    }
                    return elm;
                }else{
                    elm.style = {
                        stroke: unClickColor
                    }
                    return elm;
                }
            })
            setEdges(tmpEdges);
        }
        
    }

    const selTest = () => {
        console.log(selectedNode);
        console.log("nodes: ",updateNodes);
    }

    const deleteFunc = () => {
        if(selectedNode!==null){
            let tmpNodes = [...updateNodes];
            let tmpEdges = [...edges];

            // 선택 노드 제거
            tmpNodes.forEach(element => {
                if(element.id === selectedNode.id){
                    console.log("delete node id is ",element.id)
                    tmpNodes.splice(tmpNodes.indexOf(element),1);
                    setNodes(tmpNodes);
                }
            });

            // 선택 노드와 관련 있는 간선 제거
            tmpEdges = tmpEdges.filter((elm)=>{
                console.log("check : ",elm)

                if( elm.source === selectedNode.id || elm.target === selectedNode.id ){
                    console.log(elm)
                    return false;
                }
                return true;
            })


            setEdges(tmpEdges);
        }else if(selectedEdge !== null){
            let tmpEdges = [...edges];
            
            tmpEdges.forEach(element=>{
                if( element.id === selectedEdge.id ){
                    console.log(element);
                    tmpEdges.splice(tmpEdges.indexOf(element),1);
                    setEdges(tmpEdges);
                }
            })
        }

    }

    return (
        <div className="App" style={{width:'100%', height:'100vh'}}>
            <ConfigProvider locale={koKR} theme={{
                algorithm : isDarkMode ? darkAlgorithm : defaultAlgorithm
            }}>
                <FloatButton
                    icon={ isDarkMode ? <MdOutlineLightMode/> : <MdDarkMode/>}
                    onClick={toggleMode}
                />
                <ThemeProvider theme={flowTheme}>
                    <div className='bar'>
                        <Button onClick={addNode}>
                            <BsDatabaseAdd/>
                        </Button>
                        <Button onClick={saveJson}>
                            <AiOutlineSave/>
                        </Button>
                        <Button onClick={deleteFunc}>
                            <AiFillDelete/>
                        </Button>
                        <Button onClick={selTest}>
                            Test
                        </Button>
                    </div>
                    <Flow 
                        updateNodes={updateNodes}
                        edges={edges} 
                        setEdges={setEdges} 
                        onNodesChange={onNodesChange} 
                        onEdgesChange={onEdgesChange} 
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        onNodeDrag={onNodeDrag}
                        onEdgeClick={onEdgeClick}
                        onPaneClick={onPaneClick}
                    />
                </ThemeProvider>

            </ConfigProvider>
            
        </div>
    );
}

export default App;
