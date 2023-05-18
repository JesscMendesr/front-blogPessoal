import React, {ChangeEvent, useState, useEffect} from "react";
import { Box, Button, Grid, TextField} from "@mui/material/";
import {Typography } from "@material-ui/core";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { login } from "../../services/Service";
import UserLogin from "../../models/UserLogin";

function Login() {
  // cria a variavel para navegação interna pela rota
  const navigate = useNavigate();

  // cria um estado para armazenamento no localStorage do navegador
  const [token, setToken] = useLocalStorage('token');

  // cria um estado de controle para o usuário preencher os dados de login
  const [userLogin, setUserLogin] = useState<UserLogin>(
    {
      id: 0,
      usuario: '',
      senha: '',
      token: ''
    }
  )

  // atualiza os dados do estado acima, e ajuda a formar o JSON para a requisição
  function updatedModel(e: ChangeEvent<HTMLInputElement>){
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

      // efeito que fica de olho no token, e quando chega algo diferente de vazio, navega o usuario para a home.
      useEffect(()=>{
        if(token != ''){
            navigate('/home')
        }
    }, [token])


  // função que envia o formulário para o backend
  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    // previne que o formulário atualize a página
    e.preventDefault();
    try {
      await login(`/usuarios/logar`, userLogin, setToken)
      alert('Usuário logado com sucesso!');
    } catch (error) {
      alert('Dados do usuário inconsistentes. Erro ao logar!');
    }
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center' >
        <Grid alignItems='center' item xs={8}>
          <Box paddingX={46}>
            <form onSubmit={onSubmit}>
              <Typography variant="h4" gutterBottom align="center"
              >
                Entrar
              </Typography>
              <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="usuario" label="usuário" name="usuario" margin="normal" fullWidth variant="filled" color="info" />
              <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="senha" label="senha" name="senha" margin="normal" fullWidth variant="filled" color="info" type="password" />
              <Box marginTop={4} textAlign='center'>
                <Button className='botao2' variant="outlined" size='large' type='submit'>Logar</Button>
              </Box>
            </form>
            <Box display='flex' justifyContent='center' marginTop={4}>
              <Box marginRight={2}>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Não tem uma conta?
                </Typography>
              </Box>
              <Link to='/cadastrousuario'>
                <Typography variant="subtitle1" gutterBottom align="center" style= {{textDecoration:'underline'}}>
                  Cadastre-se
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4} className="imagemLogin"></Grid>
      </Grid>
    </>
  );
}

export default Login;
