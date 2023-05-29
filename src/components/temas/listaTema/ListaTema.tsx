import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import { Tema } from '../../../models/Tema'
import { Link, useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import {toast} from 'react-toastify'
import './ListaTema.css'

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();

  useEffect(()=>{
    if(token == ''){
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


  async function getTema(){
    await busca("/temas", setTemas, {
      headers: {
        'Authorization': token
      }
    })
    console.log(temas)
  }

  useEffect(()=>{
    getTema()
  }, [temas])

  return (
    <>
    {temas.length === 0 
      // com o sinal de interrogação, fazemos a saida padrão do if, para caso a condição seja verdadeira
        ? <div className="alinhamento"><span className="loader"></span></div> 
        // o dois pontos (:) representa o ELSE de um if padrão, e colocamos a saida para caso a condição seja falsa. Nesse caso, exibir nada
        : <></>}
      {
        temas.map(tema =>(
          <Grid container wrap='wrap'>
                <Box m={2} minWidth="25%">
                <Card  className='card-posts'>
                <CardContent className='card-posts'>
                  <Typography 
                  gutterBottom variant="subtitle2" component="div">
                    Temas
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {tema.descricao}
                  </Typography>
                  <CardActions>
                  <Link to={`/formularioTema/${tema.id}`}>
                    <Box>
                      <Button className='btnAtualizar'variant='outlined' size="small">Atualizar</Button>
                    </Box>
                  </Link>
                  <Link to={`/deletarTema/${tema.id}`}>
                    <Box>
                      <Button variant='outlined' className="btnDeletar" size="small">Deletar</Button>
                    </Box>
                  </Link>
                  </CardActions>
                  </CardContent>
                </Card>
              </Box>
              </Grid>
      ))
      }
    </>
  );
}

export default ListaTema