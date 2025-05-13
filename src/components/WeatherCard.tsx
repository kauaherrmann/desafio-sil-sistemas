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
  Alert, // Adicione o Alert aqui
} from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

const cities = ["São Paulo", "Rio de Janeiro", "Curitiba", "Passo Fundo", "Porto Alegre"];
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

const WeatherCard = () => {
  const [city, setCity] = useState(cities[0]);
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;
  const { data, loading, error } = useFetchData(url, undefined, [city]);

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
       <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
         <Typography
           variant="h6"
           gutterBottom
           sx={{ fontSize: 29, fontWeight: "bold", mt: 1 }}
         >
           Weather forecast
         </Typography>
         <FormControl
           size="small"
           sx={{ Width: 160, minWidth: 160 }}
           variant="standard"
         >
           <Select
             variant="standard"
             labelId="city-select-label"
             value={city}
             onChange={(e) => setCity(e.target.value)}
             IconComponent={ArrowDropDownIcon}
             disableUnderline
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
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error === "Network Error"
              ? "Não foi possível conectar ao serviço de clima. Verifique sua conexão."
              : `Erro ao buscar dados do clima: ${error}`}
          </Alert>
        ) : weather ? (
          <>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              {weather.icon && (
                <img
                  src={weather.icon}
                  alt={weather.desc}
                  width={60}
                  height={60}
                />
              )}
              <Typography variant="h4" sx={{ fontSize: 48 }}>
                {weather.temp}
              </Typography>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <Typography color="text.secondary" sx={{ fontSize: 22 }}>
                  {weather.desc}
                </Typography>
              </Box>
            </Box>
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
              <DeviceThermostatIcon sx={{ fontSize: 23, mr: 1, color: "#0b72d2", opacity: 1 }} />
              <span style={{ opacity: 0.7 }}>Feels like:</span>
              <span style={{ opacity: 1, fontWeight: 500, marginLeft: 6 }}>{weather.feelslike}</span>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: 20,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <WaterDropIcon sx={{ fontSize: 22, mr: 1, color: "#0b72d2", opacity: 1 }} />
              <span style={{ opacity: 0.7 }}>Humidity:</span>
              <span style={{ opacity: 1, fontWeight: 500, marginLeft: 6 }}>{weather.humidity}</span>
            </Typography>
          </>
        ) : null}

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
               <span aria-hidden="true">→</span>
             </Typography>
           </Box>
         )}
      </CardContent>
    </Card>
  );
};

export default WeatherCard;