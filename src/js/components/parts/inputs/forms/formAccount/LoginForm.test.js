import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import LoginForm from './formLogin.js'
import { MemoryRouter } from 'react-router-dom'

// const MockReCAPTCHA = jest.fn(({ sitekey, ref }) => {
//     const mockRef = {
//       current: {
//         getValue: jest.fn().mockReturnValue('mock-token'),
//         reset: jest.fn(),
//       },
//     };
//     ref.current = mockRef.current;
//     return <div data-testid="mock-recaptcha" />;
//   });

//   // Mock the react-google-recaptcha module
//   jest.mock('react-google-recaptcha', () => MockReCAPTCHA);

describe('LoginForm', () => {
  test('renders the login form', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    expect(screen.getByTestId('username-input')).toBeInTheDocument()
    expect(screen.getByTestId('password-input')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  test('updates the username input', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    const usernameInput = screen.getByTestId('username-input')
    userEvent.type(usernameInput, 'testuser')
    expect(usernameInput).toHaveValue('testuser')
  })

  test('updates the password input', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    )
    const passwordInput = screen.getByTestId('password-input')
    userEvent.type(passwordInput, 'testpassword')
    expect(passwordInput).toHaveValue('testpassword')
  })

  //   test('calls the onSubmit function with form data', () => {
  //     const mockOnSubmit = jest.fn();
  //     render(
  //       <MemoryRouter>
  //         <LoginForm onSubmit={mockOnSubmit} />
  //       </MemoryRouter>,
  //     );

  //     const usernameInput = screen.getByTestId('username-input');
  //     const passwordInput = screen.getByTestId('password-input');
  //     const loginButton = screen.getByRole('button', { name: 'Login' });

  //     userEvent.type(usernameInput, 'testuser');
  //     userEvent.type(passwordInput, 'testpassword');
  //     fireEvent.click(loginButton);

  //     expect(mockOnSubmit).toHaveBeenCalledWith({
  //       username: 'testuser',
  //       password: 'testpassword',
  //     });
  //   });
})
