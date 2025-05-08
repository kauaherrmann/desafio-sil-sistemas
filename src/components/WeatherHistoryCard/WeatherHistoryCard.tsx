import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { WeatherHistoryData } from '../../types/weather';
import styles from './WeatherHistoryCard.module.css';

const WeatherHistory: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherHistoryData[]>([]);
  const city = 'Caxias do Sul';

  const getDateDaysAgo = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const days = [1, 2];
        const requests = days.map((day) =>
          axios.get<WeatherHistoryData>('https://api.weatherapi.com/v1/history.json', {
            params: {
              key: import.meta.env.VITE_WEATHER_API_KEY,
              q: city,
              dt: getDateDaysAgo(day),
              lang: 'pt',
            },
          })
        );
        const responses = await Promise.all(requests);
        setWeatherData(responses.map((res) => res.data));
      } catch (error) {
        console.error('Erro ao buscar clima histórico:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Histórico do Clima - {city}</h2>
      {weatherData.map((data) => {
        const day = data.forecast.forecastday[0];
        return (
          <div className={styles.card} key={day.date}>
            <div className={styles.cardText}>
              <h3>{day.date}</h3>
              <p>Temperatura média: {day.day.avgtemp_c}°C</p>
              <p>Máxima: {day.day.maxtemp_c}°C</p>
              <p>Mínima: {day.day.mintemp_c}°C</p>
              <p>Condição: {day.day.condition.text}</p>
            </div>
            <img
              className={styles.conditionIcon}
              src={day.day.condition.icon}
              alt={day.day.condition.text}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WeatherHistory;
