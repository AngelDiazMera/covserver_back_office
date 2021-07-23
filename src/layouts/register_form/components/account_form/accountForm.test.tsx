import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import AccountForm from './AccountForm'

// Acceptation criteria from US:
//  1. Se deben validar las entradas de los campos a través de una 
//     expresión regular
//  2. Se debe verificar que el email sea válido antes de proceder con el
//     registro
//  3. No pueden existir dos cuentas con la misma dirección de correo 
//     electrónico

describe('Email validations', () => {

    let component: RenderResult;

    // Callback simulation
    const sfmHandler = jest.fn()
    const ufdHandler = jest.fn()

    const testProps = {
        setFormCompleted: sfmHandler, // callback
        updateFormData: ufdHandler // callback
    }

    // Before each test
    beforeEach(() => {
        component = render(
            <Router>
                <AccountForm 
                    setFormCompleted={testProps.setFormCompleted}
                    updateFormData={testProps.updateFormData}/>
            </Router>
        )
    })

    test('Email must be valid', () => {
        const email = 'my_email@example.com'
        // Inputs
        const emailTxt = component.getByPlaceholderText('micorreo@ejemplo.com')
        // Fire onchange events
        fireEvent.change(emailTxt, {target: {value: email}})

        expect(emailTxt).toHaveStyle(`background: #f8f9fa`)
    })

    test('Email must not be valid', () => {
        // Testing email
        const email = 'my_email@incorrectDom'
        // Gets the input from Dom
        const emailTxt = component.getByPlaceholderText('micorreo@ejemplo.com')
        // Fire onchange event
        fireEvent.change(emailTxt, {target: {value: email}})
        // Validation
        component.getByText('La dirección de email no es válida.');
    })

})