import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../App";
import "@testing-library/jest-dom";
import Navigations from './Navigations';

test('renders Navigations component', () => {
  render(
    <BrowserRouter>
      <Navigations />
    </BrowserRouter>
  );

  // Check if the logo is present
  const logoElement = screen.getByAltText('Library App logo');
  expect(logoElement).toBeInTheDocument();

  // Check if the "Books" link is present
  const booksLink = screen.getByText('Books');
  expect(booksLink).toBeInTheDocument();

  // Assuming the component is initially not logged in, check if "Login" and "Register" links are present
  const loginLink = screen.getByText('Login');
  const registerLink = screen.getByText('Register');
  expect(loginLink).toBeInTheDocument();
  expect(registerLink).toBeInTheDocument();


});
