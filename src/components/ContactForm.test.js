import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from './ContactForm'


describe('Tests Animal Form', ()=>{
    
    test("renders the ContactForm without crashing", () => {
      render(<ContactForm />);
    });

    test('User can fill out and submit form', async ()=>{
        //Arrange
        render(<ContactForm />);

        //Act
        //////query each input
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const messageInput = screen.getByLabelText(/message/i);
        const button = screen.getByRole('button');


        // const button = screen.getByRole('button');
        ///////fill out form elements
        fireEvent.change(firstNameInput, { target: { value:'Krista' } } )
        fireEvent.change(lastNameInput, { target: { value:'Verleger' } } )
        fireEvent.change(emailInput, { target: { value:'test@test.com' } } )
        fireEvent.change(messageInput, { target: { value:'testing a message' } } )

        // fireEvent.change(speciesInput, {target:{name:'species', value:'canine'}})

        ///////click submit button
        act(() => {
            fireEvent.click(button)
        });
        
        //Assert
        ///////test that the input from form exists in list
        // const newAnimal = await screen.findAllByText(/canine/i); 
    })

})