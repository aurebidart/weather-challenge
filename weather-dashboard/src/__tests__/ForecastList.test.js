import { render, screen } from '@testing-library/react';
import ForecastList from '../components/ForecastList';

describe('ForecastList Component', () => {
    const mockForecast = [
        { date: '2025-06-09', temp: 22, description: 'Sunny', icon: '01d' },
        { date: '2025-06-10', temp: 18, description: 'Rainy', icon: '09d' },
        { date: '2025-06-11', temp: 20, description: 'Cloudy', icon: '03d' },
    ];

    test('should render forecast items correctly', () => {
        render(<ForecastList forecast={mockForecast} />);
        expect(screen.getByText(/2025-06-09/i)).toBeInTheDocument();
        expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
        expect(screen.getByText(/22°/i)).toBeInTheDocument();

        expect(screen.getByText(/2025-06-10/i)).toBeInTheDocument();
        expect(screen.getByText(/Rainy/i)).toBeInTheDocument();
        expect(screen.getByText(/18°/i)).toBeInTheDocument();
    });

    test('should show message when forecast list is empty', () => {
        render(<ForecastList forecast={[]} />);
        expect(screen.getByText(/no forecast available/i)).toBeInTheDocument();
    });
});
