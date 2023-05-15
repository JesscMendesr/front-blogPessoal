import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box, Stack } from "@mui/material";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <Grid container md={10} style={{ margin: "auto" }}>
        <AppBar
          style={{
            height: "90px",
            backgroundColor: "black",
            flexDirection: "row",
            borderBottom: "0.02rem solid white",
          }}
          position="static"
        >
          <Toolbar
            style={{
              width: "100%",
              justifyContent: "space-between",
              textTransform: "uppercase",
            }}
            variant="dense"
          >
            <Box style={{ cursor: "pointer" }}>
              <Typography variant="h5" color="inherit">
                BlogPessoal
              </Typography>
            </Box>
            <Stack
              justifyContent="start"
              flexDirection={"row"}
              style={{ gap: "40px" }}
            >
              <Box className="item-menu" mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="subtitle1" color="inherit">
                  home
                </Typography>
              </Box>
              <Box className="item-menu" mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="subtitle1" color="inherit">
                  postagens
                </Typography>
              </Box>
              <Box className="item-menu" mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="subtitle1" color="inherit">
                  temas
                </Typography>
              </Box>
              <Box className="item-menu" mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="subtitle1" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              <Box className="botao" mx={1} style={{ cursor: "pointer" }}>
                <Typography variant="subtitle1" color="inherit">
                  logout
                </Typography>
              </Box>
            </Stack>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
}

export default Navbar;
