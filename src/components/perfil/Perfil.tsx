import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TokenState } from '../../store/tokens/tokensReducer'
import User from '../../models/User'
import { buscaId, post, put } from '../../services/Service'
import { Avatar, Box, Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from '@material-ui/core'
import { Stack } from '@mui/material'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Perfil() {
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  );
  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
    )
    
    const [usuario, setUsuario] = useState<User>({
      id: +userId,
      foto: '',
      nome: '',
      usuario: '',
      senha: '',
      postagem: null,
      })

      async function getUserById(id: number) {
        await buscaId(`/usuarios/${id}`, setUsuario, {
        headers: {Authorization: token}
        })
        }

                
        useEffect(() => {
          getUserById(+userId)
          }, [])


          useEffect(() => {
            setUsuario({
              ...usuario,
              senha: ''
            })
          }, [usuario.usuario])

          const [confirmarSenha, setConfirmarSenha] = useState<string>('');

          function confirmSenha(event: ChangeEvent<HTMLInputElement>) {
            setConfirmarSenha(event.target.value);
          }

          function updateModel(event: ChangeEvent<HTMLInputElement>) {
            setUsuario({
              ...usuario,
              [event.target.name]: event.target.value,
            });
          }
        








          async function atualizar(event: ChangeEvent<HTMLFormElement>) {
            event.preventDefault();
            if (usuario.senha === confirmarSenha && usuario.senha.length >= 8) {
              try {
                await put('/usuarios/atualizar', usuario, setUsuario, {
                  headers: {
                    Authorization: token,
                  },
                });
                alert('Usuário cadastrado com sucesso');
                setUsuario({ ...usuario, senha: '' });
                setConfirmarSenha('');
              } catch (error) {
                alert('Falha ao cadastrar o usuário, verifique os campos');
              }
            } else {
              alert('Os campos de Senha e Confirmar Senha estão diferentes');
              setUsuario({ ...usuario, senha: '' });
              setConfirmarSenha('');
            }
          }
        

          
  return (
    <>
    <Grid container>
    <Box paddingY={10}>
      <Container maxWidth="sm" className="topo">
            <form className='form box' onSubmit={atualizar}>
              <Stack gap={2}>
                <Typography className='form' variant="h4" color="textSecondary" component="h1" align="center" >Cadastrar tema</Typography>
                <Avatar alt="Remy Sharp" src={usuario.foto} />
                <TextField value={usuario.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id="nome" label="nome" name="nome" margin="normal" fullWidth variant="filled" />
                <TextField value={usuario.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id="usuario" label="usuário" name="usuario" margin="normal" fullWidth variant="filled" />
                <TextField value={usuario.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id="foto" label="foto" name="foto" margin="normal" fullWidth variant="filled" />
                <TextField value={usuario.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} id="senha" label="Senha" name="senha" margin="normal"  fullWidth variant="filled" />
                <TextField value={confirmarSenha}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => confirmSenha(event)
                  } id="confirmarSenha" label="Confirmar senha" name="confirmarSenha" margin="normal" type='password' fullWidth variant="filled" />
                <Box>
                  <Button className='btn' type="submit" variant="contained" color="primary">
                      Finalizar
                  </Button>
                </Box>
                </Stack>
            </form>
      </Container>
    </Box>
    <Box>
      {usuario.postagem?.map((post) => (
                <Card className='card-posts'>
                <CardContent className='card-posts'>
                  <Typography  className='text-underline' gutterBottom variant="h5" component="div">
                    {post.titulo}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2" component="div">
                  {post.tema?.descricao}
                  </Typography>
                  <Typography className='bodyText' variant="body2">
                    {post.texto}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Postado por: {usuario?.nome}
                  </Typography>
                  <CardActions>
                    <Link to={`/formularioPostagem/${post.id}`}>
                    <Button className='btnAtualizar'variant='outlined' size="small">Atualizar</Button>
                    </Link>
                    <Link to={`/deletarPostagem/${post.id}`}>
                    <Button variant='outlined' className="btnDeletar" size="small">Deletar</Button>
                    </Link>
                  </CardActions>
                  </CardContent>
                </Card>
      ))}
    </Box>
    </Grid>
    </>
  )
}

export default Perfil