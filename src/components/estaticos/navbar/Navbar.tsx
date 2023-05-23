import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box, Stack, Button } from "@mui/material";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <AppBar position="static" className="navbar">
        <Toolbar>
          <Grid container alignItems={"center"} justifyContent={"space-between"}>
            <Box className="cursor">
              <Typography variant="h5" color="inherit">
                BlogPessoal
              </Typography>
            </Box>
            <Stack alignItems={"center"} justifyContent="start" flexDirection={"row"} gap={"40px"}>
              <Link className="link" to='/home'>
                <Box className="item-menu" p={1} mx={1}>
                  <Typography variant="subtitle1" color="inherit">
                    home
                  </Typography>
                </Box>
              </Link>
              <Link className="link" to='/postagens'>
                <Box p={1} className="item-menu" mx={1}
                >
                  <Typography variant="subtitle1" color="inherit">
                    postagens
                  </Typography>
                </Box>
              </Link>
              <Link className='link'to='/temas'>
              <Box
                p={1}
                className="item-menu"
                mx={1}
              >
                <Typography variant="subtitle1" color="inherit">
                  temas
                </Typography>
              </Box>
              </Link>
              <Box
                p={1}
                className="item-menu"
                mx={1}
              >
                <Typography variant="subtitle1" color="inherit">
                  cadastrar tema
                </Typography>
              </Box>
              <Link to='/'>
              <Box mx={1}>
                  <Button size="large" className="botao" variant="outlined" href="#outlined-buttons"
                  >
                    logout
                  </Button>
                </Box>
                </Link>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
