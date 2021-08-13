import styled from "styled-components";

interface TdProps {
    type:string;
}

export interface ItemSelect {
    [key: string]: string
}

const colorParser: ItemSelect = {
    'infected': 'red',
    'risk': 'orange',
    'healthy': 'green'
};

const RiskTd = styled.td<TdProps>`
    &:before {
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: ${props => colorParser[props.type]};
        opacity: 0.65;
        margin-right: 10px
    }
`;


export default RiskTd;