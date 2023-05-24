import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { Tema } from '../../../models/Tema';
import { buscaId, deleteId } from '../../../services/Service';
import { Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css'

function DeletarTema() {
  let navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const [token, setToken] = useLocalStorage('token');
  const [tema, setTema] = useState<Tema>()

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado")
      navigate("/login")
    }
  }, [token])

  useEffect(() =>{
    if( id != undefined){
      findById(id)
    }
  }, [id])

  async function findById(id:string) {
    buscaId(`/temas/${id}`, setTema, {
      headers: {
        'Authorization': token
      }
    })
  }

  function sim(){
    navigate('/temas')
    deleteId(`/temas/${id}`, {
      headers: {
        Authorization: token
      }
    });
    alert('Tema deletado com sucesso')
  }
  function nao(){
    navigate('/temas')
  }


  return (
    <>
      <Box m={2}>
        <Card className='box'  variant="outlined">
          <CardContent>
            <Box  justifyContent="center">
              <Typography className='texto' color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography className='texto' color="textSecondary">
                {tema?.descricao}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="outlined" size='large'className="marginLeft botao2">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button onClick={nao} className='btnCancelar' size='large' variant="outlined">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default DeletarTema
