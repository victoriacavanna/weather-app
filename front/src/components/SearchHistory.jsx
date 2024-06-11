import { useState, useEffect } from 'react';
import axios from 'axios';
import EnhancedTable from './EnhancedTable';

const SearchHistory = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/weather');
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error al buscar datos del historial:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <EnhancedTable weatherData={weatherData} />
    </div>
  );
};

export default SearchHistory;
