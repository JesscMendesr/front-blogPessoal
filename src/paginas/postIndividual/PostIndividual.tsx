import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TokenState } from '../../store/tokens/tokensReducer';
import { Postagem } from '../../models/Postagem';
import { toast } from 'react-toastify';
import { buscaId, deleteId } from '../../services/Service';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import './postIndividual.css'

function postIndividual() {
  let navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const [post, setPosts] = useState<Postagem>()

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

  useEffect(() =>{
    if( id != undefined){
      findById(id)
    }
  }, [id])

  async function findById(id:string) {
    buscaId(`/postagens/${id}`, setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }

  function sim(){
    navigate('/postagens')
    deleteId(`/postagens/${id}`, {
      headers: {
        Authorization: token
      }
    });
    toast.success('Postagem deletada com sucesso!',{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
  })
  }
  function nao(){
    navigate('/postagens')
  }

  return (
    <>
<Box display={'flex'}  justifyContent={'center'} m={4}  >
        <Card className='containerBox'>
        <CardContent className='card-posts'>
          <Typography  className='text-underline' gutterBottom variant="h5" component="div">
            {post?.titulo}
          </Typography>
          <Box>
          <Typography gutterBottom variant="subtitle2" component="div">
          {post?.tema?.descricao}
          </Typography>
          <Typography variant="body2" component="p">
            Postado por: {post?.usuario?.nome}
          </Typography>
          </Box>
          <Typography className='bodyTextindiv' variant="body2">
            {post?.texto}
          </Typography>
          </CardContent>
        </Card>
      </Box>
  </>
  )
}
export default postIndividual