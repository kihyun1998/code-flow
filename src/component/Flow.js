import { 
    Background, 
    MiniMap
} from 'reactflow';

import 'reactflow/dist/style.css';
import CustomNode from '../custom-component/CustomNode';
import CustomControl from '../custom-component/CustomControl';
import CustomMiniMap from '../custom-component/CustomMiniMap';
import CustomReactFlow from '../custom-component/CustomReactFlow';

const NodeTypes = {
    custom: CustomNode,
};


function Flow(props) {
    // const [nodes,setNodes, onNodesChange] = useNodesState(initialNodes);
    // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // const [nodes,setNodes] = useState(initialNodes);
    // const [edges, setEdges] = useState(initialEdges);

    // // node can click & drag
    // const onNodesChange = useCallback(
    //     (changes) => setNodes(
    //         (nds)=>applyNodeChanges(changes,nds)
    //     ),[]
    // );
    // // node drag 시 edge도 따라가야되서(maybe?)
    // const onEdgesChange = useCallback(
    //     (changes) => setNodes(
    //         (nds) => applyEdgeChanges(changes,nds)
    //     ),[]
    // );


    // const onConnect = useCallback(
    //     (params) => props.setEdges(
    //         (eds) =>  addEdge(params,eds)
    //     ),[]
    // );
    

    return (
        <div className='flow-space'>
            <CustomReactFlow 
                nodes={props.updateNodes} 
                edges={props.edges}
                onNodesChange={props.onNodesChange}
                onEdgesChange={props.onEdgesChange}
                onConnect={props.onConnect}
                nodeTypes={NodeTypes}
            >
                <Background />
                <MiniMap />
                <CustomControl/>
                <CustomMiniMap/>
                
            </CustomReactFlow>
        </div>
    );
}

export default Flow;