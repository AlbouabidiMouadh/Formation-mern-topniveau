import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Link,
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Container,
} from "@mui/material";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3010/api/produits");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Browse All Products
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4}>
          Explore our full collection of quality products tailored to your
          needs.
        </Typography>

        <Grid container spacing={4}>
          {products.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No products available at the moment.
            </Typography>
          ) : (
            products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardHeader title={product.name} />
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      Category: <strong>{product.category}</strong>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight="bold"
                      mt={1}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" color="primary">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
