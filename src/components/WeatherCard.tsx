import { useState } from "react";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

// Lista de cidades disponíveis para seleção
const cities = ["São Paulo", "Rio de Janeiro", "Curitiba", "Passo Fundo", "Porto Alegre"];
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

const WeatherCard = () => {
  // Estado para cidade selecionada
  const [city, setCity] = useState(cities[0]);
  // Monta a URL da API de acordo com a cidade selecionada
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
  // Hook customizado para buscar dados do clima
  const { data, loading, error } = useFetchData(url, undefined, [city]);

  // Mapeia os dados recebidos para um formato mais simples
  const weather = data
    ? {
        temp: `${data.current.temp_c}°C`,
        desc: data.current.condition.text,
        icon: data.current.condition.icon,
        feelslike: `${data.current.feelslike_c}°C`,
        humidity: `${data.current.humidity}%`,
        wind: `${data.current.wind_kph} km/h`,
        updated: data.current.last_updated,
      }
    : null;

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
        {/* Título e seletor de cidade */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontSize: 29, fontWeight: "bold", mt: 1 }}
          >
            Weather
          </Typography>
          <FormControl
            size="small"
            sx={{ width: 160, minWidth: 160, }}
            variant="standard"
          >
            {/* Select de cidades, desabilitado durante loading */}
            <Select
              variant="standard"
              labelId="city-select-label"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              IconComponent={ArrowDropDownIcon}
              disableUnderline
              disabled={loading} // Desabilita enquanto carrega
              renderValue={(selected) => (
                <Box display="flex" alignItems="center" gap={1}>
                  <LocationOnIcon sx={{ color: "#272727", fontSize: 22 }} />
                  <span style={{ fontSize: 16 }}>{selected}</span>
                </Box>
              )}
              sx={{
                pl: 0,
                ".MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  paddingLeft: 0,
                },
                "&::before, &::after": {
                  border: "none !important",
                },
                background: "none",
                boxShadow: "none",
              }}
            >
              {cities.map((c) => (
                <MenuItem key={c} value={c}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon sx={{ color: "#272727", fontSize: 22 }} />
                    <span style={{ fontSize: 16 }}>{c}</span>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Exibe loading, erro ou dados do clima */}
        {loading ? (
          // Spinner enquanto carrega os dados
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={120}
          >
            <CircularProgress size={32} />
          </Box>
        ) : error ? (
          // Mensagem de erro amigável
          <Alert severity="error" sx={{ mb: 2 }}>
            {error === "Network Error"
              ? "Não foi possível conectar ao serviço de clima. Verifique sua conexão."
              : `Erro ao buscar dados do clima: ${error}`}
          </Alert>
        ) : weather ? (
          // Exibe os dados do clima
          <>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {/* Ícone do clima */}
              {weather.icon && (
                <img
                  src={weather.icon}
                  alt={weather.desc}
                  width={60}
                  height={60}
                />
              )}
              {/* Temperatura atual */}
              <Typography variant="h4" sx={{ fontSize: 48 }}>
                {weather.temp}
              </Typography>
              {/* Descrição do clima */}
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Typography color="text.secondary" sx={{ fontSize: 22 }}>
                  {weather.desc}
                </Typography>
              </Box>
            </Box>
            {/* Sensação térmica */}
            <Typography
              variant="body2"
              sx={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mb: 0.5,
              }}
            >
              <DeviceThermostatIcon sx={{ fontSize: 23, mr: 1, color: "#272727", opacity: 1 }} />
              <span style={{ opacity: 0.8 }}>Feels like:</span>
              <span style={{ opacity: 1, fontWeight: 500, marginLeft: 6 }}>{weather.feelslike}</span>
            </Typography>
            {/* Umidade */}
            <Typography
              variant="body2"
              sx={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <WaterDropIcon sx={{ fontSize: 22, mr: 1, color: "#272727", opacity: 1 }} />
              <span style={{ opacity: 0.8 }}>Humidity:</span>
              <span style={{ opacity: 1, fontWeight: 500, marginLeft: 6 }}>{weather.humidity}</span>
            </Typography>
          </>
        ) : null}
        {/* Link para documentação da API, só aparece se não estiver carregando */}
        {!loading && (
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
              <span aria-hidden="true">➤</span>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;