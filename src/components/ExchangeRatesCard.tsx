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

const currencyOptions = [
  { country: "United States", currency: "USD", label: "United States (USD)" },
  { country: "Brazil", currency: "BRL", label: "Brazil (BRL)" },
  { country: "Eurozone", currency: "EUR", label: "Eurozone (EUR)" },
  { country: "Bitcoin", currency: "BTC", label: "Bitcoin (BTC)" },
  // ...adicione mais moedas
];

const API_URL = "https://economia.awesomeapi.com.br/json/last/";

const ExchangeRatesCard = () => {
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

  const { data, loading, error } = useFetchData(url, undefined, [from, to]);

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

  const handleFromValueChange = (value: string) => {
    const num = parseFloat(value);
    setFromValue(num);
    if (rate) {
      setToValue(Number((num * rate).toFixed(4)));
    }
  };

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
        sx={{ minHeight: 220, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" gutterBottom>
          Currency Converter
        </Typography>
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
        {/* Mensagem de instrução */}
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
            To learn more about this API
            <span aria-hidden="true">→</span>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExchangeRatesCard;