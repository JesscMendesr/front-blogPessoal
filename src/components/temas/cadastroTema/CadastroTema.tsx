import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, Button, TextField, Box } from "@material-ui/core"
import {useNavigate, useParams } from 'react-router-dom'
import { Tema } from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import './CadastroTema.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { Stack } from '@mui/material';


function CadastroTema() {
  let navigate = useNavigate();
  const { id } = useParams<{id: string}>();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const [tema, setTema] = useState<Tema>({
    id: 0, 
    descricao: ''
  })

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

  function updatedTema(e: ChangeEvent<HTMLInputElement>) {

    setTema({
        ...tema,
        [e.target.name]: e.target.value,
    })

  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("tema " + JSON.stringify(tema))

    if (id !== undefined) {
        console.log(tema)
        put(`/temas`, tema, setTema, {
            headers: {
                'Authorization': token
            }
        })
        alert('Tema atualizado com sucesso');
    } else {
        post(`/temas`, tema, setTema, {
            headers: {
                'Authorization': token
            }
        })
        alert('Tema cadastrado com sucesso');
    }
    back()
}
function back() {
    navigate('/temas')
}
  return (
    <>
    <Box paddingY={10}>
      <Container maxWidth="sm" className="topo">
            <form className='form box' onSubmit={onSubmit}>
              <Stack gap={2}>
                <Typography className='form' variant="h4" color="textSecondary" component="h1" align="center" >Cadastrar tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" name="descricao" margin="normal" fullWidth variant="filled" />
                <Box>
                  <Button className='btn' type="submit" variant="contained" color="primary" disabled={tema.descricao.length < 4}>
                      Finalizar
                  </Button>
                </Box>
                </Stack>
            </form>
      </Container>
    </Box>
    </>
  )
}

export default CadastroTema