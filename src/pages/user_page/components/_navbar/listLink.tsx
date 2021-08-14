import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";

interface Props {
    index: number;
    actualPage: number;
    isNavActive: boolean;
    config: {
        route: string;
        icon:  string;
        name:  string;
    },
    onClick: React.MouseEventHandler<HTMLElement>;
}

interface StyledProps {
    active: boolean;
    isNavActive?: boolean;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const roundStyle = `
    content: "";
    display:block;
    height: 10px;
    width: 100%;
    margin-left:auto;
    background-color:#303f9f;
    transition: 100ms;
`;

const StyledLink = styled.li<StyledProps>`
    &:before {
        ${roundStyle}
        border-radius: 0px 0px 10px 0px;
    }
    &:after {
        ${roundStyle}
        border-radius: 0px 10px 0px 0px;
    }
    transition: 250ms ease-out;
    width: calc(100% - ${props => props.isNavActive ? '0px' : '25px'}) !important;
    margin: 0px 0px 0px ${props => props.isNavActive ? '0px' : '25px'};
    background: ${props => (props.active 
        ? '#f8f9fc' 
        : '#303f9f')};
    @media (max-width: 768px) {
        width: 100%  !important;
        margin: 0px;
    }
`;

const NavLink = styled(Link)<StyledProps>`
    background-color: ${props => props.active ? '#f8f9fc' : '#303f9f'};
    border-radius: 10px 0px 0px 10px !important;
    color: ${props => props.active ? '#303f9f' : 'white'} !important;
    height:${props => props.isNavActive ? '75px' : '40px'};
    margin-left: -10px;
    width: calc(${props => props.isNavActive ? '7.7rem' : '14rem'} - 15px) !important;
    transition: 250ms ease-out ;
    @media (max-width: 768px) {
        width: 7rem !important;
        height: 75px;
    }
`;


function ListLink(props: Props) {
    const {route, icon, name} = props.config;
    const isActive = props.actualPage === props.index;

    console.log('render ', name, props.actualPage, '-', props.index);

    return (
        <StyledLink className="nav-item" active={isActive} isNavActive={props.isNavActive}>
            <NavLink className={`nav-link fs-6 fw-bolder p-2  ${props.isNavActive ? 'ps-md-2' : 'ps-md-4'} user-select-none`} to={route} active={isActive} isNavActive={props.isNavActive}  onClick={props.onClick}>
                <i className={`${icon}`} style={{color:isActive ? "#303f9f" : 'white'}}/>
                <span> {name}</span>
            </NavLink>
        </StyledLink>
    )
}

export default React.memo(ListLink);
