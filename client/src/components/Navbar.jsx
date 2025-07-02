import React from 'react';
import { AppBar, Toolbar, Button, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center", gap: 4 }}>
        {navLinks.map(({ label, path }) => (
          <Button
            key={label}
            component={RouterLink}
            to={path}
            color="inherit"
            sx={{ fontWeight: "bold", textTransform: "none" }}
          >
            {label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
