import styled from "styled-components";

const Background = styled.div`
    height: 100vh;
    padding: 30px;
    color: white;
    background: rgb(2,0,36);
    background: -moz-linear-gradient(-30deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 100%);
    background: -webkit-linear-gradient(-30deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 100%);
    background: linear-gradient(-30deg, rgba(2,0,36,1) 0%, rgba(63,81,181,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#020024",endColorstr="#3f51b5",GradientType=1);
    @media (max-width: 991.5px) {
        height: auto;
        padding: 20px;
    }
`;

export default Background;