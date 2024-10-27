// src/components/Login.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    test('renders login form', () => {
        renderWithRouter(<Login />);
        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    test('displays error on invalid credentials', async () => {
        renderWithRouter(<Login />);
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'invalid' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'invalid' } });
        fireEvent.click(screen.getByText(/login/i));

        expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();

        // Wait for error message to disappear after 3 seconds
        await waitFor(() => {
            expect(screen.queryByText(/invalid username or password/i)).not.toBeInTheDocument();
        }, { timeout: 3500 });
    });

    test('redirects to admin page on valid admin credentials', () => {
        renderWithRouter(<Login />);
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'johndoe@123' } });
        fireEvent.click(screen.getByText(/login/i));

        // Check if redirected to the admin dashboard
        expect(screen.getByText(/welcome to the dashboard/i)).toBeInTheDocument(); // Adjust this based on your Dashboard text
    });

    test('redirects to user page on valid user credentials', () => {
        renderWithRouter(<Login />);
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'Nick' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'nick123' } });
        fireEvent.click(screen.getByText(/login/i));

        // Check if redirected to the user page
        expect(screen.getByText(/welcome, user!/i)).toBeInTheDocument(); // Adjust this based on your UserPage text
    });

    test('redirects to guest page on valid guest credentials', () => {
        renderWithRouter(<Login />);
        fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'Guest' } });
        fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'guest@123' } });
        fireEvent.click(screen.getByText(/login/i));

        // Check if redirected to the guest page
        expect(screen.getByText(/welcome, guest!/i)).toBeInTheDocument(); // Adjust this based on your GuestPage text
    });

    test('requires username and password fields', () => {
        renderWithRouter(<Login />);

        fireEvent.click(screen.getByText(/login/i));
        expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    });
});
