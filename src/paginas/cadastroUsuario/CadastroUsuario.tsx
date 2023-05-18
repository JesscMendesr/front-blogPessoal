import { Box, Button, Grid, Typography } from '@material-ui/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CadastroUsuario.css'
import { TextField } from '@mui/material'
import User from '../../models/User'
import { cadastroUsuario } from '../../services/Service'

function CadastroUsuario() {

  // constante para efetuar a navegação do usuário por dentro da lógica
  const navigate = useNavigate();

  // state para controlar o formulário enquanto o usuário preenche o mesmo
  const [user, setUser] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  // state que vai receber a resposta do backend, para verificar se veio tudo ok
  const [userResp, setUserResp] = useState<User>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  // state para armazenar o campo de confirmação de senha, e fazer a checagem com a senha do usuário
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Função para atualizar o estado do confirmar senha
  function confirmSenha(event: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(event.target.value);
  }

  // Função para atualizar o estado de controle do formulário de usuário, automatizada para todos os campos
  function updateModel(event: ChangeEvent<HTMLInputElement>){
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  // Função de disparo da requisição para o backend, é bom deixar ela como assincrona
  async function cadastrar(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault();
    // verificar se os campos de senha e confirmar são iguais, e com no mínimo 8 caracteres
    if (user.senha === confirmarSenha && user.senha.length >= 8) {
      // caso passe pelo If, vai executar a tentativa de cadastro, e dar o alerta de sucesso
      try {
        await cadastroUsuario('usuarios/cadastrar', user, setUserResp);
        alert('Usuário cadastrado com sucesso')
      } catch (error){
        // se der erro no cadastro, por exemplo por e-mail repetido, vai cair nessa msg de erro
        alert('Falha ao cadastrar o usuário, verifique os campos');
      }
    }else {
      //aqui é a mensagem de erro para o caso dos campos de senha estarem diferentes, vai avisar e apagar os dois campos
      alert('Os campos de Senha e Confirmar senha são diferentes');
      setUser({...user, senha:''});
      setConfirmarSenha('')
    }
  }

  // controle de efeito para levar a pessoa para a tela de login assim que o backend devolver o JSON de cadastro com ok
  useEffect(() =>{
    if (userResp.id !== 0){
      navigate('/login');
    }
  }, [userResp]);

  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid item xs={6} className='imagem2'></Grid>
        <Grid item xs={6} alignItems='center'>
          <Box>
            <form onSubmit={cadastrar}>
                <Typography variant="h4" gutterBottom align="center"
                >
                  Cadastrar
                </Typography>
                <TextField value={user.nome} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id="nome" label="nome" name="nome" margin="normal" fullWidth variant="filled" color="info" />
                <TextField value={user.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id="usuario" label="usuário" name="usuario" margin="normal" fullWidth variant="filled" color="info" />
                <TextField value={user.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id="senha" label="senha" name="senha" margin="normal" fullWidth variant="filled" color="info" type='password' />
                <TextField value={confirmarSenha} onChange={(event: ChangeEvent<HTMLInputElement>) => confirmSenha(event)} id="confirmarSenha" label="Confirmar senha" name="confirmarSenha" margin="normal" fullWidth variant="filled" color="info" type="password" />
                <TextField value={user.foto} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id="foto" label="Foto" name="foto" margin="normal" fullWidth variant="filled" color="info" />
                <Box marginTop={4} textAlign='center'>
                  <Link to='/Login' className="text-decorator-none"> <Button className='botao2 btnCancelar' variant="outlined" size='large' >Cancelar</Button></Link>
                  <Button type='submit' className='botao2' variant="outlined" size='large' >Cadastrar</Button>
                </Box>
              </form>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default CadastroUsuario