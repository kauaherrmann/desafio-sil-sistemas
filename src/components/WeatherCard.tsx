import { useState, useEffect } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box, // Adicione o Box
} from "@mui/material";
import axios from "axios";

const cities = ["São Paulo", "Rio de Janeiro", "Curitiba"];
const API_KEY = "918f1ec3fdb840d6be183238250705";

const WeatherCard = () => {
  const [city, setCity] = useState(cities[0]);
  const [weather, setWeather] = useState<{
    temp: string;
    desc: string;
    icon: string;
    feelslike: string;
    humidity: string;
    wind: string;
    updated: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}`
      )
      .then((res) => {
        setWeather({
          temp: `${res.data.current.temp_c}°C`,
          desc: res.data.current.condition.text,
          icon: res.data.current.condition.icon,
          feelslike: `${res.data.current.feelslike_c}°C`,
          humidity: `${res.data.current.humidity}%`,
          wind: `${res.data.current.wind_kph} km/h`,
          updated: res.data.current.last_updated,
        });
      })
      .catch(() => setWeather(null))
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });
  }, [city]);

  return (
    <Card
      sx={{
        minWidth: 450,
        maxWidth: 450,
        width: "100%",
        flex: "1 1 360px",
        m: 1,
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardContent
        sx={{ minHeight: 260, display: "flex", flexDirection: "column" }}
      >
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <WbSunnyIcon sx={{ color: "#a8e1fb", fontSize: 40 }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: 28, fontWeight: "bold", mt: 1 }}
          >
            Weather forecast
          </Typography>
        </Box>
        <FormControl fullWidth size="small" sx={{ mb: 1 }}>
          {/* ... */}
        </FormControl>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="city-select-label">City</InputLabel>
          <Select
            labelId="city-select-label"
            value={city}
            label="Cidade"
            onChange={(e) => setCity(e.target.value)}
          >
            {cities.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {loading ? (
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={120}
          >
            <CircularProgress size={32} />
          </Box>
        ) : weather ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {weather.icon && (
                <img
                  src={weather.icon}
                  alt={weather.desc}
                  width={40}
                  height={40}
                />
              )}
              <Typography variant="h4" sx={{ fontSize: 48 }}>
                {weather.temp}
              </Typography>
            </div>
            <Typography color="text.secondary">{weather.desc}</Typography>
            <Typography variant="body2">
              Feels like: {weather.feelslike}
            </Typography>
            <Typography variant="body2">
              Humidity: {weather.humidity}
            </Typography>
          </>
        ) : (
          <Typography color="error">Erro ao buscar clima.</Typography>
        )}

        {/* Adicione este bloco abaixo */}
        <Box mt="auto" pt={2}>
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
            }}
          >
            To learn more about this API
            <span aria-hidden="true">→</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
