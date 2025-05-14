import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

// Chave da API e URL de notícias
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=en&max=5&token=${API_KEY}`;

const NewsCard = () => {
  // Busca as notícias usando hook customizado
  const { data, loading, error } = useFetchData(API_URL, undefined, []);
  // Mapeia os dados recebidos para um formato mais simples
  const news =
    data?.articles?.map((a: any) => ({
      title: a.title,
      description: a.description,
      url: a.url,
    })) ?? [];

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
          minHeight: 220,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Título do card */}
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: 24, mb: 1 }}>
          News
        </Typography>
        {/* Conteúdo: loading, erro ou lista de notícias */}
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={100}
          >
            <CircularProgress size={28} />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : news.length > 0 ? (
          <List
            dense
            sx={{
              maxHeight: 180,
              overflow: "auto",
              mb: 1,
            }}
          >
            {news.map((item: { title: string; description: string; url: string }, idx: number) => (
              <ListItem key={idx} disablePadding>
                <ListItemText
                  primary={
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        fontWeight: 500,
                        fontSize: 16,
                        display: "inline-block",
                        maxWidth: 370,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </Link>
                  }
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No news found.
          </Typography>
        )}
        {/* Link para documentação da API */}
        <Box mt="auto" pt={2}>
          <Typography
            variant="body2"
            color="primary"
            component="a"
            href="https://gnews.io/docs/"
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

export default NewsCard;