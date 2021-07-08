import styled from "styled-components";

import img from '../../../assets/fondo.png';

const Image = styled.img.attrs(props => ({
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

export default Image;