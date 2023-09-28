import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    /*공통 스타일*/
    align-items: center;
    outline: none;
    border: none;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 1em;
    
    /*크기*/
    height: 4vh;
    width: 4vw;
    font-size: 1em;

    /*색상 */
    background: #228be6;

    transition: 0.5s;
    &:hover{
        background: #339af0;
        transition: 0.3s;
    }

    &:active{
        background: #1c7ed6;
    }

`
function CustomButton({children,...rest}){
    return <StyledButton {...rest}>{children}</StyledButton>
}

export default CustomButton;