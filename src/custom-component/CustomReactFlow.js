import { styled } from 'styled-components';
import ReactFlow from 'reactflow';

const CustomReactFlow = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

export default CustomReactFlow;