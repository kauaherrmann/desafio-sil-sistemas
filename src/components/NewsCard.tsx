import { useState, useEffect } from "react";
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
import axios from "axios";

const API_KEY = "f3b38f185b784385257e99bddc98ed5b"; // Cadastre-se em https://gnews.io/ para obter uma chave gratuita
const API_URL = `https://gnews.io/api/v4/top-headlines?lang=en&max=5&token=${API_KEY}`;

const NewsCard = () => {
  const [news, setNews] = useState<
    { title: string; description: string; url: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        setNews(
          res.data.articles.map((a: any) => ({
            title: a.title,
            description: a.description,
            url: a.url,
          }))
        );
      })
      .catch(() => setNews([]))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, []);

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
          News
        </Typography>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={100}
          >
            <CircularProgress size={28} />
          </Box>
        ) : news.length > 0 ? (
          <List
            dense
            sx={{
              maxHeight: 180, // ajuste conforme necessário
              overflow: "auto",
              mb: 1,
            }}
          >
            {news.map((item, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemText
                  primary={
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
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
