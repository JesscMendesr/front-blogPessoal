import React from "react";
import { Box, Button, Grid, TextField} from "@mui/material/";
import {Typography } from "@material-ui/core";

import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center' >
        <Grid alignItems='center' item xs={8}>
          <Box paddingX={46}>
            <form action="">
              <Typography variant="h4" gutterBottom align="center"
              >
                Entrar
              </Typography>
              <TextField id="usuario" label="usuário" name="usuario" margin="normal" fullWidth variant="filled" color="info" />
              <TextField id="senha" label="senha" name="senha" margin="normal" fullWidth variant="filled" color="info" type="password" />
              <Box marginTop={4} textAlign='center'>
                <Link to='/home' className="text-decorator-none"> <Button className='botao2' variant="outlined" size='large' type='submit'>Logar</Button></Link>
              </Box>
            </form>
            <Box display='flex' justifyContent='center' marginTop={4}>
              <Box marginRight={2}>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Não tem uma conta?
                </Typography>
              </Box>
              <Typography variant="subtitle1" gutterBottom align="center" style={{textDecoration:'underline'}}>
                Cadastre-se
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className="imagemLogin"></Grid>
      </Grid>
    </>
  );
}

export default Login;
