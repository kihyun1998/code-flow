import { MiniMap } from "reactflow";
import { styled } from "styled-components";

const CustomMiniMap = styled(MiniMap)`
  background-color: ${(props) => props.theme.bg};

  .react-flow__minimap-mask {
    fill: ${(props) => props.theme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    fill: ${(props) => props.theme.nodeBg};
    stroke: none;
  }
`;

export default CustomMiniMap;