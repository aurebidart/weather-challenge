import { render, screen, fireEvent } from '@testing-library/react';
import FavoritesList from '../components/FavoritesList';

describe('FavoritesList Component', () => {
    const favorites = [
        { id: 1, city_name: 'Córdoba', country_code: 'AR' },
        { id: 2, city_name: 'Madrid', country_code: 'ES' },
    ];

    test('should display favorite cities', () => {
        render(<FavoritesList favorites={favorites} onRemove={() => { }} onSelect={() => { }} />);
        expect(screen.getByText(/Córdoba, AR/i)).toBeInTheDocument();
        expect(screen.getByText(/Madrid, ES/i)).toBeInTheDocument();
    });

    test('should call onRemove when delete button is clicked', () => {
        const onRemove = jest.fn();
        render(<FavoritesList favorites={favorites} onRemove={onRemove} onSelect={() => { }} />);
        const removeButtons = screen.getAllByRole('button', { name: /remove/i });
        fireEvent.click(removeButtons[0]);
        expect(onRemove).toHaveBeenCalledWith(1);
    });

    test('should call onSelect when city is clicked', () => {
        const onSelect = jest.fn();
        render(<FavoritesList favorites={favorites} onRemove={() => { }} onSelect={onSelect} />);
        const cityButton = screen.getByText(/Madrid, ES/i);
        fireEvent.click(cityButton);
        expect(onSelect).toHaveBeenCalledWith('Madrid');
    });

    test('should show message when no favorites exist', () => {
        render(<FavoritesList favorites={[]} onRemove={() => { }} onSelect={() => { }} />);
        expect(screen.getByText(/no favorite cities yet/i)).toBeInTheDocument();
    });
});
