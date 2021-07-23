import React from "react"
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import AccountForm from "../register_form/components/account_form/accountForm";
import CarousselForm from "./carrouselForm";
import ConfirmationForm from "../register_form/components/confirmation_form/confirmationForm";
import EnterpriseForm from "../register_form/components/enterprise_form/enterpriseForm";

describe('Caroussel', () => {
    let component: RenderResult;

    const testProps = { // Test props for component
        slides: [AccountForm, EnterpriseForm, ConfirmationForm,],
        setActualIndex: 0, 
    }

    // Callback simulation
    const mockHandler = jest.fn()

    // Before each test
    beforeEach(() => {
        component = render(
            <Router>
                <CarousselForm slides={testProps.slides} setActualIndex={mockHandler}/>
            </Router>
        )
    })

    test('Must not slide if form is uncompleted', () => {
        // Component to render
        // Button to be tested
        const nextButton = component.getByText('Siguiente')
        // OnClick event to button is fired
        fireEvent.click(nextButton)
        // Explects that the slide is not swipped
        expect(mockHandler).toHaveBeenCalledTimes(0)
    })

})



