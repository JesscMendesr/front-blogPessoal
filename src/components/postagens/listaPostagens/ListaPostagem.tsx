import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './ListaPostagens.css'
import { Postagem } from '../../../models/Postagem';
import { Link, useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import {toast} from 'react-toastify'

function ListaPostagem() {
  const [posts, setPosts] = useState<Postagem[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  
  useEffect(() => {
    if (token == "") {
      toast.error('Você precisa estar logado!',{
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
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
      {posts.length === 0 
      // com o sinal de interrogação, fazemos a saida padrão do if, para caso a condição seja verdadeira
        ? <div className="alinhamento"><span className="loader"></span></div> 
        // o dois pontos (:) representa o ELSE de um if padrão, e colocamos a saida para caso a condição seja falsa. Nesse caso, exibir nada
        : <></>}
      {posts.map(post =>(
        <Box display={'flex'}  justifyContent={'center'} m={4}  >
        <Card className='containerBox'>
        <CardContent className='card-posts'>
        <Box display={'flex'} alignItems={'center'}>
            <Box paddingRight={2} paddingBottom={2}>
              <Avatar  src={post.usuario?.foto}> </Avatar>
              </Box>
              <Typography variant="body2" component="p">
                {post.usuario?.nome}
              </Typography>
          </Box>
          <Link className='reset-link' to={`/postindividual/${post.id}`}>
          <Typography  className='text-underline' gutterBottom variant="h5" component="div">
            {post.titulo}
          </Typography>
          </Link>
          <Box>
          <Typography gutterBottom variant="subtitle2" component="div">
          {post.tema?.descricao}
          </Typography>


          </Box>
          <Typography className='bodyText' variant="body2">
            {post.texto}
          </Typography>
          </CardContent>
        </Card>
      </Box>
      ))
      }
    </>
  );
}

export default ListaPostagem