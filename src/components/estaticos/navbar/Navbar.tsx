import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box, Stack, Button } from "@mui/material";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import {toast} from 'react-toastify';

function Navbar() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  function goLogout(){
    dispatch(addToken(''));
    toast.info('Usuário deslogado',{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    navigate('/login')
  }  

  var navbarComponent;

  if(token != ''){
    navbarComponent = <AppBar position="static" className="navbar">
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
          <Link className='link' to='/formularioTema'>
          <Box p={1} className="item-menu" mx={1}>
            <Typography variant="subtitle1" color="inherit">
              cadastrar tema
            </Typography>
          </Box>
          </Link>
          <Box mx={1} onClick={goLogout}>
              <Button size="large" className="botao" variant="outlined" href="#outlined-buttons">
                logout
              </Button>
            </Box>
        </Stack>
      </Grid>
    </Toolbar>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
