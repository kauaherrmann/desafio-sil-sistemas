import axios from 'axios';

const apiKey = 'SUA_CHAVE_AQUI'; // substitua pela sua chave da OpenWeatherMap

export const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: apiKey,
    units: 'metric',
    lang: 'pt_br',
  },
});
