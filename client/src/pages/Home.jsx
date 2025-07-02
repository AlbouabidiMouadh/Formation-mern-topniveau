import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Link,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3010/api/produits");
      setFeaturedProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          py: 6,
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Discover Our Exclusive Products
        </Typography>
        <Typography variant="h6">
          Welcome to E-Shop — your trusted online store for quality and value.
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 5 }}>
        {/* Why Choose Us */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Why Shop With Us
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {[
              "Exceptional Customer Satisfaction",
              "Eco-Friendly & Natural Products",
              "Reliable & Fast Delivery",
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card elevation={3} sx={{ textAlign: "center", py: 3 }}>
                  <CardContent>
                    <Typography variant="h6">{feature}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Featured Products
          </Typography>
          <Typography variant="body1" textAlign="center" mb={3}>
            Handpicked items just for you — high-quality, popular, and
            best-selling!
          </Typography>
          <Grid container spacing={3}>
            {featuredProducts.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardHeader title={item.name} />
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      Category: <strong>{item.category}</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {item.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight="bold"
                      mt={1}
                    >
                      ${item.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" color="primary">
                      View Product
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" textAlign="center" gutterBottom>
            About Our Store
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ px: { xs: 2, md: 6 }, lineHeight: 1.8 }}
          >
            At E-Shop, we believe shopping should be easy, enjoyable, and
            sustainable. Our team carefully curates high-quality products to
            meet your needs while ensuring ethical sourcing and fast delivery.
            Whether you're looking for daily essentials or special gifts, E-Shop
            has you covered.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
