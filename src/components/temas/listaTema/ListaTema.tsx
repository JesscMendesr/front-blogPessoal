import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import { Tema } from '../../../models/Tema'
import useLocalStorage from 'react-use-localstorage';
import { Link, useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';

function ListaTema() {
  const [temas, setTemas] = useState<Tema[]>([])
  const [token, setToken] = useLocalStorage('token');
  let navigate = useNavigate();

  useEffect(()=>{
    if(token == ''){
      alert("Você precisa estar logado")
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
      {
        temas.map(tema =>(
                <Box  m={4} maxWidth='25%' >
                <Card className='card-posts'>
                <CardContent className='card-posts'>
                  <Typography gutterBottom variant="subtitle2" component="div">
                    Temas
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {tema.descricao}
                  </Typography>
                  <CardActions>
                  <Link to=''>
                    <Box>
                      <Button className='btnAtualizar'variant='outlined' size="small">Atualizar</Button>
                    </Box>
                  </Link>
                  <Link to=''>
                    <Box>
                      <Button variant='outlined' className="btnDeletar" size="small">Deletar</Button>
                    </Box>
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

export default ListaTema