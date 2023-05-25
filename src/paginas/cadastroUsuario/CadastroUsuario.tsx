import { Box, Grid, Typography } from '@material-ui/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './CadastroUsuario.css'
import { TextField } from '@mui/material'
import User from '../../models/User'
import { cadastroUsuario } from '../../services/Service'
import Button from '@mui/material/Button';

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

  // Função para atualizar o estado do confirmar senha. esta função espera um dado do tipo changeEvent dentro de um elemento input
  function confirmSenha(event: ChangeEvent<HTMLInputElement>){
    setConfirmarSenha(event.target.value); // esta função seta um valor no campo de confirmação de senha.
  }

  // Função para atualizar o estado de controle do formulário de usuário, automatizada para todos os campos.
  function updateModel(event: ChangeEvent<HTMLInputElement>){
    setUser({
      ...user, // spread operator permite expandir o conteúdo da array, não sendo necessário digitar todos os atributos novamente. 
      [event.target.name]: event.target.value, // identifica o input de acordo com o name dele e captura o seu valor.
    });
  }

  // Função de disparo da requisição para o backend, é bom deixar ela como assincrona pois o backend leva um tempo até receber a requisição.
  async function cadastrar(event: ChangeEvent<HTMLFormElement>){
    event.preventDefault(); // evento para impedir que a página recarregue ao enviar o formulário. se issoa ocontecer todos os dados serão perdidos antes dos mesmos serem enviados parao backend.

    // verificar se os campos de senha e confirmar são iguais, e com no mínimo 8 caracteres
    if (user.senha === confirmarSenha && user.senha.length >= 8) {
      // caso passe pelo If, vai executar a tentativa de cadastro, e dar o alerta de sucesso
      try {
        await cadastroUsuario('usuarios/cadastrar', user, setUserResp); // o await é para esperar a resposta do backend.
        alert('Usuário cadastrado com sucesso')
      } catch (error){
        // se der erro no cadastro, por exemplo por e-mail repetido, vai cair nessa msg de erro
        alert('Falha ao cadastrar o usuário, verifique os campos');
      }
    }else {
      //aqui é a mensagem de erro para o caso dos campos de senha estarem diferentes, vai avisar e apagar os dois campos
      alert('Os campos de Senha e Confirmar senha são diferentes');
      setUser({...user, senha:''}); // esvazia o texto do campo senha
      setConfirmarSenha('')  // esvazia o texto do campo confirmarSenha;
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
        <Grid item xs={4} className='imagem2'></Grid>
        <Grid item xs={8} alignItems='center' justifyContent='center'>
          <Box justifySelf='center' maxWidth='50%' margin='auto'>
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
                  <Link to='/Login' className="text-decorator-none"> <Button className='btnCancelar' size='large' variant="outlined" color="error">
                    Cancelar
                  </Button></Link>
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