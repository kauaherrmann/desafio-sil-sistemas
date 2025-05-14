import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

// Lista de opções de moedas e países disponíveis para conversão
const currencyOptions = [
  { country: "United States", currency: "USD", label: "United States (USD)" },
  { country: "Brazil", currency: "BRL", label: "Brazil (BRL)" },
  { country: "Eurozone", currency: "EUR", label: "Eurozone (EUR)" },
  { country: "Bitcoin", currency: "BTC", label: "Bitcoin (BTC)" },
  { country: "United Kingdom", currency: "GBP", label: "United Kingdom (GBP)" },
  { country: "Japan", currency: "JPY", label: "Japan (JPY)" },
  { country: "Canada", currency: "CAD", label: "Canada (CAD)" },
  { country: "Australia", currency: "AUD", label: "Australia (AUD)" },
  { country: "Switzerland", currency: "CHF", label: "Switzerland (CHF)" },
];

// URL base da API de câmbio
const API_URL = "https://economia.awesomeapi.com.br/json/last/";

const ExchangeRatesCard = () => {
  // Estados para as moedas selecionadas e valores de conversão
  const [from, setFrom] = useState<(typeof currencyOptions)[0] | null>(null);
  const [to, setTo] = useState<(typeof currencyOptions)[0] | null>(null);
  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(0);
  const [rate, setRate] = useState<number | null>(null);

  // Monta a URL apenas se ambas as moedas forem selecionadas e diferentes
  const url =
    from && to && from.currency !== to.currency
      ? `${API_URL}${from.currency}-${to.currency}`
      : null;

  // Hook customizado para buscar dados da API
  const { data, loading, error } = useFetchData(url, undefined, [from, to]);

  // Atualiza taxa e valores ao trocar moedas ou valores
  useEffect(() => {
    if (!from || !to) return;
    if (from.currency === to.currency) {
      setRate(1);
      setToValue(fromValue);
      return;
    }
    if (data) {
      const pair = `${from.currency}${to.currency}`;
      const bid = parseFloat(data[pair]?.bid ?? "1");
      setRate(bid);
      setToValue(Number((fromValue * bid).toFixed(4)));
    }
  }, [data, from, to, fromValue]);

  // Atualiza valor de destino ao alterar valor de origem
  const handleFromValueChange = (value: string) => {
    const num = parseFloat(value);
    setFromValue(num);
    if (rate) {
      setToValue(Number((num * rate).toFixed(4)));
    }
  };

  // Atualiza valor de origem ao alterar valor de destino
  const handleToValueChange = (value: string) => {
    const num = parseFloat(value);
    setToValue(num);
    if (rate && rate !== 0) {
      setFromValue(Number((num / rate).toFixed(4)));
    }
  };

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
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Título do conversor */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", fontSize: 28, mt: 1 }}
          mb={2}
        >
          Currency Converter
        </Typography>
        {/* Seletores de moedas e campos de valor */}
        <Box display="flex" gap={2} mb={2}>
          {/* Caixa da moeda de origem */}
          <Box flex={1}>
            <Autocomplete
              options={currencyOptions}
              getOptionLabel={(option) => option.label}
              value={from}
              onChange={(_, newValue) => setFrom(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="From" size="small" />
              )}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "setWidth",
                      enabled: true,
                      phase: "beforeWrite",
                      requires: ["computeStyles"],
                      fn: ({ state }) => {
                        state.styles.popper.width = `${state.rects.reference.width}px`;
                      },
                    },
                  ],
                },
                paper: {
                  sx: {
                    maxWidth: 220,
                    maxHeight: 150,
                    width: "100%",
                    boxSizing: "border-box",
                  },
                },
              }}
            />
            <TextField
              type="number"
              label="Amount"
              size="small"
              value={fromValue}
              onChange={(e) => handleFromValueChange(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
              disabled={!from}
            />
          </Box>
          {/* Caixa da moeda de destino */}
          <Box flex={1}>
            <Autocomplete
              options={currencyOptions}
              getOptionLabel={(option) => option.label}
              value={to}
              onChange={(_, newValue) => setTo(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="To" size="small" />
              )}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "setWidth",
                      enabled: true,
                      phase: "beforeWrite",
                      requires: ["computeStyles"],
                      fn: ({ state }) => {
                        state.styles.popper.width = `${state.rects.reference.width}px`;
                      },
                    },
                  ],
                },
                paper: {
                  sx: {
                    maxWidth: 220,
                    maxHeight: 150,
                    width: "100%",
                    boxSizing: "border-box",
                  },
                },
              }}
            />
            <TextField
              type="number"
              label="Amount"
              size="small"
              value={toValue}
              onChange={(e) => handleToValueChange(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
              disabled={!to}
            />
          </Box>
        </Box>
        {/* Mensagem de instrução ou resultado */}
        {!from || !to ? (
          <Typography color="text.secondary" align="center">
            Please select both currencies to see the exchange rate.
          </Typography>
        ) : loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={60}
          >
            <CircularProgress size={28} />
          </Box>
        ) : error ? (
          <Typography color="error">Error fetching exchange rate.</Typography>
        ) : rate !== null ? (
          <Typography variant="body2" color="text.secondary">
            1 {from.currency} = {rate} {to.currency}
          </Typography>
        ) : null}
        {/* Link para documentação da API */}
        <Box mt="auto" pt={2}>
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="https://docs.awesomeapi.com.br/api-de-moedas"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
            }}
          >
            Click to learn about the API
            <span aria-hidden="true">❮</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExchangeRatesCard;