// import data from '../data/nodes.json'

// 로컬 JSON 불러오기
const fs = window.require('fs');
const { app } = window.require('@electron/remote');
const homePath = `${app.getPath('home')}/.erd/`;
const jsonDataPath = `${homePath}/jsonData.json`
let jData;
if (fs.existsSync(jsonDataPath)) {
    const data = fs.readFileSync(jsonDataPath);
    jData = JSON.parse(data);
}


export const nodes = jData.nodes.map(node => ({
    id: node.id,
    data: { label: node.data.label },
    position: {
        x: node.position.x,
        y: node.position.y
    },
    type: node.type
}));

// json 사용하기 전 방식
// export const nodes = [
//     {
//         id: '1',
//         data: { label: 'Hello' },
//         position: { x: 0, y: 0 },
//         type: 'custom',
//     },
//     {
//         id: '2',
//         data: { label: 'World' },
//         position: { x: 100, y: 100 },
//         type: 'custom',
//     },
// ];

export const edges = [
    {
        // id:'1-2',
        // source: '1',
        // target: '2',
        // label: 'to',
        // type: 'step'
    }
]