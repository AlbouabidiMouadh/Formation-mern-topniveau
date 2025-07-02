import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Link,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

const About = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            About E-Shop
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }} gutterBottom>
            E-Shop is a modern e-commerce platform committed to providing
            high-quality, eco-friendly, and affordable products. Founded with
            the vision of making online shopping seamless and trustworthy, we
            cater to a wide range of customers with diverse needs.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }} gutterBottom>
            Our dedicated team works tirelessly to curate and deliver products
            that meet the highest standards of quality and customer
            satisfaction. Whether you're shopping for essentials, gifts, or
            something unique — we’ve got you covered.
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Thank you for choosing E-Shop. We’re here to serve you better every
            day.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
