import { render, screen } from '@testing-library/react';
import WeatherCard from '../components/WeatherCard';

describe('WeatherCard Component', () => {
    const mockWeather = {
        city: 'Córdoba',
        country: 'AR',
        temp: 22,
        humidity: 60,
        description: 'Partly cloudy',
        icon: '03d',
    };

    test('should display weather data correctly', () => {
        render(<WeatherCard weather={mockWeather} />);
        expect(screen.getByText(/Córdoba, AR/i)).toBeInTheDocument();
        expect(screen.getByText(/22°/i)).toBeInTheDocument();
        expect(screen.getByText(/humidity: 60%/i)).toBeInTheDocument();
        expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            expect.stringContaining('03d')
        );
    });

    test('should show placeholder text if no weather data is available', () => {
        render(<WeatherCard weather={null} />);
        expect(screen.getByText(/no weather data/i)).toBeInTheDocument();
    });
});
