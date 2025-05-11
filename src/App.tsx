import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import WeatherCard from "./components/WeatherCard";
import ExchangeRatesCard from "./components/ExchangeRatesCard";
import NewsCard from "./components/NewsCard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ py: 4 }}>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          gap={3}
          sx={{
            marginTop: -10,
            position: "relative",
            zIndex: 2,
            width: "100%",
            overflowX: "auto", // permite rolagem horizontal se necessário
          }}
        >
          <WeatherCard />
          <ExchangeRatesCard />
          <NewsCard />
        </Box>
      </Container>
    </>
  );
}

export default App;