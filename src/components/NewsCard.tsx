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
  Alert,
} from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

// Chave da API e URL de notícias
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY as string;
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=en&max=5&token=${API_KEY}`;

const NewsCard = () => {
  const { data, loading, error } = useFetchData(API_URL, undefined, []);
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
        maxHeight: 250,
        width: "100%",
        flex: "1 1 360px",
        m: 1,
        borderRadius: 3,
        boxShadow: 4,
        bgcolor: "#000032",
      }}
    >
      <CardContent
        sx={{
          minHeight: 260,
          maxHeight: 260,
          display: "flex",
          flexDirection: "column",
          color: "#fffefc",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: 24, mb: 1 }}>
          News
        </Typography>
        {/* Loading, erro ou conteúdo */}
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
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : news.length > 0 ? (
          <List
            dense
            sx={{
              maxHeight: 180,
              overflow: "auto",
              mb: 1,
              '&::-webkit-scrollbar': {
                width: 8,
                backgroundColor: '#00c48c',
                borderRadius: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#00c48c',
                borderRadius: 8,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#00a37a',
              },
              scrollbarColor: '#00c48c #000133',
              scrollbarWidth: 'thin',
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
                        color: "#00c48c",
                      }}
                    >
                      {item.title}
                    </Link>
                  }
                  secondary={item.description}
                  primaryTypographyProps={{ sx: { color: "#fffefc" } }}
                  secondaryTypographyProps={{ sx: { color: "#fffefc"} }}
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
        {!loading && !error && (
          <Box mt="auto" pt={2}>
            <Typography
              variant="body2"
              color="#00c48c"
              component="a"
              href="https://gnews.io/"
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

export default NewsCard;