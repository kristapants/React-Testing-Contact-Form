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
        ///////fill out form elements
        fireEvent.change(firstNameInput, { target: { value:'Krista' } } )
        fireEvent.change(lastNameInput, { target: { value:'Verleger' } } )
        fireEvent.change(emailInput, { target: { value:'test@test.com' } } )
        fireEvent.change(messageInput, { target: { value:'testing a message' } } )
        ///////click submit button
        fireEvent.click(button)
        //Assert
        ///////test that the input from form exists in list
        const newFirstName = await screen.findAllByText(/"firstName": "Krista"/i); 
        const newLastName = await screen.findAllByText(/"lastName": "Verleger"/i); 
        const newEmail = await screen.findAllByText(/"email": "test@test.com"/i); 
        const newMessage = await screen.findAllByText(/"message": "testing a message"/i); 
    })

    test('User can fill out and submit form without a value entered for message', async ()=>{
        //Arrange
        render(<ContactForm />);
        //Act
        //////query each input
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const button = screen.getByRole('button');
        ///////fill out form elements
        fireEvent.change(firstNameInput, { target: { value:'Krista' } } )
        fireEvent.change(lastNameInput, { target: { value:'Verleger' } } )
        fireEvent.change(emailInput, { target: { value:'test@test.com' } } )
        ///////click submit button
        fireEvent.click(button)
        //Assert
        ///////test that the input from form exists in list
        const newFirstName = await screen.findAllByText(/"firstName": "Krista"/i); 
        const newLastName = await screen.findAllByText(/"lastName": "Verleger"/i); 
        const newEmail = await screen.findAllByText(/"email": "test@test.com"/i); 
        const newMessage = await screen.findAllByText(/"message": ""/i); 
    })

    test('User sees an error when leaving first name empty', async ()=>{
        //Arrange
        render(<ContactForm />);
        //Act
        //////query each input
        const firstNameInput = screen.getByLabelText(/first name/i);
        ///////fill out form elements
        fireEvent.focus(firstNameInput)
        fireEvent.blur(firstNameInput)
        //Assert
        ///////test that the input from form exists in list
        const noFirstName = await screen.findAllByText(`Looks like there was an error: required`); 
    })

    test('User sees an error when leaving last name empty', async ()=>{
        render(<ContactForm />);
        const lastNameInput = screen.getByLabelText(/last name/i);
        fireEvent.focus(lastNameInput)
        fireEvent.blur(lastNameInput)
        const noLastName = await screen.findByText(`Looks like there was an error: required`);
    })

    test('User sees an error when leaving email empty', async ()=>{
        render(<ContactForm />);
        const emailInput = screen.getByLabelText(/email/i);
        fireEvent.focus(emailInput)
        fireEvent.blur(emailInput)
        const noLastName = await screen.findByText(`Looks like there was an error: required`);
    })

    test('User sees an error when the first name exceeds 50 characters', async ()=>{
        render(<ContactForm />);
        const firstNameInput = screen.getByLabelText(/first name/i);
        fireEvent.change(firstNameInput, { target: { value:'Sir Franklin Pompington Henry David Mark Hudson Mary Russell Georgia Lewis' } } )
        fireEvent.blur(firstNameInput)
        const longFirstName = await screen.findByText(`Looks like there was an error: maxLength`);
    })

    test('User sees an error when the last name exceeds 50 characters', async ()=>{
        render(<ContactForm />);
        const lastNameInput = screen.getByLabelText(/last name/i);
        fireEvent.change(lastNameInput, { target: { value:'Helvetica Groundsworth Codwell Ficus Esquire Begrudge Aleatoric Francesco Jones' } } )
        fireEvent.blur(lastNameInput)
        const longLastName = await screen.findByText(`Looks like there was an error: maxLength`);
    })

})