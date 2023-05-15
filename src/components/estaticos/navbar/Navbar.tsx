import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box, Stack, Button } from "@mui/material";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Box style={{ cursor: "pointer" }}>
              <Typography variant="h5" color="inherit">
                BlogPessoal
              </Typography>
            </Box>
            <Stack
              alignItems={"center"}
              justifyContent="start"
              flexDirection={"row"}
              gap={"40px"}
            >
              <Box
                className="item-menu"
                p={1}
                mx={1}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="body2" color="inherit">
                  home
                </Typography>
              </Box>
              <Box
                p={1}
                className="item-menu"
                mx={1}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="subtitle1" color="inherit">
                  postagens
                </Typography>
              </Box>
              <Box
                p={1}
                className="item-menu"
                mx={1}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="subtitle1" color="inherit">
                  temas
                </Typography>
              </Box>
              <Box
                p={1}
                className="item-menu"
                mx={1}
                style={{ cursor: "pointer" }}
              >
                <Typography variant="subtitle1" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: "pointer" }}>
                <Button
                  size="large"
                  className="botao"
                  variant="outlined"
                  href="#outlined-buttons"
                >
                  logout
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
