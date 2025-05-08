import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { WeatherData } from '../../types/weather';
import styles from './WeatherCard.module.css';

const WeatherCard: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [isDataLoading, setIsDataLoadind] = useState<boolean>(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsDataLoadind(true);
      setWeather(null)
      try {
        const response = await axios.get<WeatherData>(
          'https://api.weatherapi.com/v1/current.json',
          {
            params: {
              key: import.meta.env.VITE_WEATHER_API_KEY,
              q: city,
              lang: 'pt',
            },
          }
        ); 
        setWeather(response.data);
        setIsDataLoadind(false);
      } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return (
    <div className={styles.weatherCard}>
      <select name="" id="" onChange={(e) => setCity(e.target.value)}>
        <option value="" disabled>Selecione</option>
        <option value="Caxias do Sul">Caxias do Sul</option>
        <option value="Porto Alegre">Porto Alegre</option>
        <option value="Rio de Janeiro">Rio de Janeiro</option>
        <option value="Campinas">Campinas</option>
        <option value="Passo Fundo">Passo Fundo</option>
      </select>
      {isDataLoading && (
        <span className={styles.loader}></span>
      )}
      {!isDataLoading && !weather && (
        <p className={styles.city}>Selecione uma das cidades</p>
      )}
      {weather && (
        <> 
          <h2 className={styles.city}>
            {weather.location.name}, {weather.location.region}
          </h2>
          <p className={styles.temp}>{weather.current.temp_c}°C</p>
          <p className={styles.condition}>{weather.current.condition.text}</p>
          <img
            className={styles.icon}
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <p className={styles.details}>Umidade: {weather.current.humidity}%</p>
          <p className={styles.details}>Vento: {weather.current.wind_kph} km/h</p>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
