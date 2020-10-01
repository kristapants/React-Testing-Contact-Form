import React from "react";
import { render } from "@testing-library/react";
import App from "./App";


describe('Test for App', ()=>{
  
  test("renders App without crashing", () => {
    render(<App />);
  });

})
