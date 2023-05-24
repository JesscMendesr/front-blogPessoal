import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './ListaPostagens.css'
import { Postagem } from '../../../models/Postagem';
import useLocalStorage from 'react-use-localstorage';
import { Link, useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';

function ListaPostagens() {
  const [posts, setPosts] = useState<Postagem[]>([])
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      navigate("/login")
    }
  }, [token])

  async function getPost() {
    await busca("/postagens", setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {
    getPost()
  }, [posts])
  
  return (
    <>
      {posts.map(post =>(
        <Box  m={4} maxWidth='25%' >
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
      </Box>
      ))
      }
    </>
  );
}

export default ListaPostagens