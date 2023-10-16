import { 
    Background, 
    MiniMap
} from 'reactflow';

import 'reactflow/dist/style.css';
import CustomNode from '../custom-component/CustomNode';
import CustomControl from '../custom-component/CustomControl';
import CustomMiniMap from '../custom-component/CustomMiniMap';
import CustomReactFlow from '../custom-component/CustomReactFlow';
import CustomConnectionLine from '../custom-component/CustomConnectionLine';

const NodeTypes = {
    custom: CustomNode,
};


function Flow(props) {

    return (
        <div className='flow-space'>
            <CustomReactFlow 
                nodes={props.updateNodes} 
                edges={props.edges}
                onNodesChange={props.onNodesChange}
                onEdgesChange={props.onEdgesChange}
                onConnect={props.onConnect}
                nodeTypes={NodeTypes}
                onEdgeUpdate={props.onEdgeUpdate}
                onEdgeUpdateStart={props.onEdgeUpdateStart}
                onEdgeUpdateEnd={props.onEdgeUpdateEnd}
                onNodeClick={props.onNodeClick}
                onNodeDrag={props.onNodeDrag}
                onPaneClick={props.onPaneClick}
                connectionLineComponent={CustomConnectionLine}
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