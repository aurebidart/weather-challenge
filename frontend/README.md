# Weather Dashboard – Front-End Documentation

## Overview

This React + Vite application displays current weather, a 5-day forecast, favorites, and search history. It consumes a local REST API (`/api/weather/*`). State is managed globally via **WeatherContext**.

## Folder Structure

```
src/
 ├─ assets/            # static images (optional)
 ├─ components/        # UI components
 │   ├─ Header/
 │   ├─ SearchBar/
 │   ├─ WeatherCard/
 │   ├─ ForecastList/
 │   ├─ FavoritesList/
 │   ├─ WeatherHistory/
 │   └─ Loader/
 ├─ context/
 │   └─ WeatherContext.jsx
 ├─ styles/            # global css / variables
 ├─ App.jsx            # main layout
 ├─ main.jsx           # React-DOM entry & WeatherProvider wrapper
 └─ index.css          # global baseline styles
```

## Global State (WeatherContext)

| Key           | Purpose                                   |
| ------------- | ----------------------------------------- |
| `weatherData` | Current weather details for selected city |
| `forecast`    | 5-day forecast (one midday sample/day)    |
| `favorites`   | Cities stored in DB via `POST /favorites` |
| `history`     | Search history from `GET /history`        |
| `unit`        | `metric` / `imperial`, toggled in Header  |
| `loading`     | Boolean flag to trigger Loader overlay    |

Exposed helpers: `searchCity`, `addFavorite`, `removeFavorite`, `fetchFavorites`, `clearHistory`, `toggleUnit`.

## Component Responsibilities

| Component          | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Header**         | Logo, unit toggle, SearchBar. Reads `unit`, calls `toggleUnit` & `searchCity`.           |
| **SearchBar**      | Input + button + icon. On *Enter* or click → `searchCity`.                               |
| **WeatherCard**    | Current-weather panel, dynamic icons, star button `addFavorite`. Unit-aware conversions. |
| **ForecastList**   | 5 square cards inside bordered container. Uses `forecast`.                               |
| **FavoritesList**  | Lists favorites; click → `searchCity`, remove → `removeFavorite`.                        |
| **WeatherHistory** | Lists past searches; click → `searchCity`; clear → `clearHistory`.                       |
| **Loader**         | Cloud-rain animation overlay bound to `loading`.                                         |

## Styling Highlights

* **App** background is pure white; each card has `border: 1px solid #ddd` and `border-radius: 12px`.
* Responsive forecast grid: `grid-template-columns: repeat(5, 1fr)`; media queries can collapse columns.
* Icons: **lucide-react** (`Lu*`) for consistent outline style.

## Tests

Located in `src/__tests__/` (Jest + React Testing Library). Current coverage:

| File                     | Purpose                       |
| ------------------------ | ----------------------------- |
| `SearchBar.test.js`      | Input validation & callback   |
| `WeatherCard.test.js`    | Render weather props fallback |
| `FavoritesList.test.js`  | Render list, remove handler   |
| `ForecastList.test.js`   | Render 5-day cards / fallback |
| `WeatherHistory.test.js` | Render history & clear button |

Run all tests:

```bash
npm test
```

## Dev Scripts

| Command           | Description           |
| ----------------- | --------------------- |
| `npm run dev`     | Start Vite dev server |
| `npm run build`   | Production build      |
| `npm run preview` | Preview built app     |
| `npm test`        | Jest test suite       |

## Environment Requirements

* Node >= 18
* `VITE_API_BASE` (optional): override default `http://localhost:3000/api`.

## License

This project is licensed under the MIT License. See the LICENSE file for details.