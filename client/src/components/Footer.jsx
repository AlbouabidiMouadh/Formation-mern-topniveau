import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 2,
        bgcolor: "grey.200",
        mt: "auto",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} E-Shop. All rights reserved.
      </Typography>
    </Box>
  );
};
export default Footer