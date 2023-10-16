import data from '../data/data.json'

// 로컬 JSON 불러오기
const fs = window.require('fs');
const { app } = window.require('@electron/remote');
const homePath = `${app.getPath('home')}/.erd/`;
const jsonDataPath = `${homePath}/jsonData.json`
let jData;

if (fs.existsSync(jsonDataPath)) {
    // 파일 존재한다면
    const data = fs.readFileSync(jsonDataPath);
    jData = JSON.parse(data);
} else{
    //파일이 없다면
    jData = data;
}


export const nodes = jData.nodes.map(node => ({
    id: node.id,
    data: { label: node.data.label },
    position: {
        x: node.position.x,
        y: node.position.y
    },
    type: node.type,
    width: node.width,
    height: node.height,
    parentNode:node.parentNode
}));

export const edges = jData.edges.map(edge=>({
    id: edge.id,
    source: edge.source,
    sourceHandle: edge.sourceHandle,
    target: edge.target,
    targetHandle: edge.targetHandle,
    animated: edge.animated,
    type: edge.type
}));