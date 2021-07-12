import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import RegisterPage from "./registerPage"

test('Renders expected content', () => {
    const component = render( 
        <Router>
            <RegisterPage/>
        </Router>
    )
    
    component.getByText('Tu nuevo observador de infectados')
    component.getByText('Crea una cuenta')
    component.getAllByText('Detalles de la cuenta')
})