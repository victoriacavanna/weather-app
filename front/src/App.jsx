import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import SearchHistory from './components/SearchHistory';
import Card from './components/Card';
import './App.css';
import Footer from './components/Footer';

const API_WEATHER_URL = 'http://api.weatherapi.com/v1/current.json?key=5c878d42efd94c98853203526240906&lang=es&q=';

const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState({ error: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temperature: 0,
    condition: '',
    conditionText: '',
    icon: '',
  });
  const [showHistory, setShowHistory] = useState(false);

  const saveSearch = async weather => {
    try {
      await axios.post('http://localhost:3000/api/weather', weather, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error guardando el historial', error);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError({ error: false, message: '' });
    setLoading(true);

    try {
      if (!city.trim()) throw { message: 'Completar el campo' };

      const response = await fetch(API_WEATHER_URL + city);
      const data = await response.json();

      if (data.error) {
        throw { message: data.error.message };
      }
      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        condition: data.current.condition.code,
        conditionText: data.current.condition.text,
        icon: data.current.condition.icon,
      };
      await saveSearch(weatherData);
      setWeather({
        ...weatherData,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <Container>
      <nav>
        <div className="title-container">
          <h1>Clima</h1>
        </div>
        <div className="btn-container">
          <button className="btn-history" onClick={toggleHistory}>
            Historial de Búsquedas
          </button>
        </div>
      </nav>

      <main>
        <div className="weather-container">
          <form role="Search" onSubmit={onSubmit} className="form">
            <TextField
              id="city"
              label="Buscar Ciudad"
              className="form-input"
              variant="outlined"
              size="medium"
              value={city}
              onChange={e => setCity(e.target.value)}
              error={error.error}
              helperText={error.message}
              required
            />
            <Button type="submit" variant="contained" className="btn-buscar" disabled={loading}>
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </form>
          {weather.city && <Card data={weather} />}
          {showHistory && <SearchHistory />}
        </div>
      </main>
      <Footer/>
    </Container>
  );
};

export default App;

