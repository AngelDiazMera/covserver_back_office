import styled from "styled-components";

import img from '../../assets/fondo.png';

// Image styled component to at the purple background
export const Image = styled.img.attrs(props => ({
    src: props.src || img
}))`
    opacity: 0.85;
    width:24vw;
    width:24vw;
    max-width:280px;
    max-height:280px;
    @media (max-width: 991.5px) {
        width: 84px;
        height: 84px;
    }
    @media (max-width: 485px) {
        width: 65.6px;
        height: 65.6px;
    }
`;

const Background = styled.div`
    height: 100vh;
    max-height: 100vh;
    padding: 0;
    color: white;
    background: rgb(49,60,205);
    background: -moz-linear-gradient(331deg, rgba(49,60,205,1) 0%, rgba(87,95,204,1) 100%);
    background: -webkit-linear-gradient(331deg, rgba(49,60,205,1) 0%, rgba(87,95,204,1) 100%);
    background: linear-gradient(331deg, rgba(49,60,205,1) 0%, rgba(87,95,204,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#313ccd",endColorstr="#575fcc",GradientType=1);
    /**@media (max-width: 991.5px) {
        height: auto;
        padding: 20px;
    }**/
`;

export default Background;