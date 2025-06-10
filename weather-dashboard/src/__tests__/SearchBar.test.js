import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
    test('should validate empty input', () => {
        render(<SearchBar onSearch={() => { }} />);
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);
        expect(screen.getByText(/please enter a city name/i)).toBeInTheDocument();
    });

    test('should call onSearch with valid city name', () => {
        const onSearch = jest.fn();
        render(<SearchBar onSearch={onSearch} />);
        const input = screen.getByPlaceholderText(/enter city/i);
        fireEvent.change(input, { target: { value: 'Cordoba' } });
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);
        expect(onSearch).toHaveBeenCalledWith('Cordoba');
    });

    test('should show error for invalid characters', () => {
        render(<SearchBar onSearch={() => { }} />);
        const input = screen.getByPlaceholderText(/enter city/i);
        fireEvent.change(input, { target: { value: 'C@rdob@' } });
        const button = screen.getByRole('button', { name: /search/i });
        fireEvent.click(button);
        expect(screen.getByText(/invalid city name/i)).toBeInTheDocument();
    });
});
