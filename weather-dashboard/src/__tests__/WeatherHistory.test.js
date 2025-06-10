import { render, screen, fireEvent } from '@testing-library/react';
import WeatherHistory from '../components/WeatherHistory';

describe('WeatherHistory Component', () => {
    const mockHistory = [
        { id: 1, city_name: 'Córdoba', country_code: 'AR', searched_at: '2025-06-08' },
        { id: 2, city_name: 'Berlin', country_code: 'DE', searched_at: '2025-06-07' },
    ];

    test('should display history entries', () => {
        render(<WeatherHistory history={mockHistory} onSelect={() => { }} />);
        expect(screen.getByText(/Córdoba, AR/i)).toBeInTheDocument();
        expect(screen.getByText(/Berlin, DE/i)).toBeInTheDocument();
    });

    test('should show message when history is empty', () => {
        render(<WeatherHistory history={[]} onSelect={() => { }} />);
        expect(screen.getByText(/no search history yet/i)).toBeInTheDocument();
    });

    test('should call onSelect when a city is clicked', () => {
        const onSelect = jest.fn();
        render(<WeatherHistory history={mockHistory} onSelect={onSelect} />);
        const cityButton = screen.getByText(/Berlin, DE/i);
        fireEvent.click(cityButton);
        expect(onSelect).toHaveBeenCalledWith('Berlin');
    });
});
