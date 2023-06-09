import React, { ChangeEvent, useEffect, useState } from 'react'
import { Container, Typography, TextField, Button, Select, InputLabel, MenuItem, FormControl, FormHelperText, Box } from "@material-ui/core"
import { useNavigate, useParams } from 'react-router-dom';
import { Postagem } from '../../../models/Postagem';
import { buscaId, put, post, busca } from '../../../services/Service';
import { Tema } from '../../../models/Tema';
import './CadastroPost.css'
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { Stack } from '@mui/material';
import User from '../../../models/User';
import {toast} from 'react-toastify'

function CadastroPost() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [temas, setTemas] = useState<Tema[]>([])
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const userId = useSelector<TokenState, TokenState["id"]>(
        (state) => state.id
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

    const [tema, setTema] = useState<Tema>(
        {
            id: 0,
            descricao: ''
        })
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        tema: null,
        usuario: null
    })

    const [usuario, setUsuario] = useState<User>({
        id: +userId,
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })


    useEffect(() => { 
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario
        })
    }, [tema])

    useEffect(() => {
        getTemas()
        if (id !== undefined) {
            findByIdPostagem(id)
        }
    }, [id])

    async function getTemas() {
        await busca("/temas", setTemas, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function findByIdPostagem(id: string) {
        await buscaId(`postagens/${id}`, setPostagem, {
            headers: {
                'Authorization': token
            }
        })
    }

    function updatedPostagem(e: ChangeEvent<HTMLInputElement>) {

        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem atualizada com sucesso!',{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        } else {
            post(`/postagens`, postagem, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            toast.success('Postagem cadastrada com sucesso!',{
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
        back()

    }

    function back() {
        navigate('/postagens')
    }

return (
    <Box paddingY={8}>
    <Container maxWidth="sm" className="topo">
        <form onSubmit={onSubmit}>
        <Stack gap={2}>
            <Typography  className='form' variant="h4" color="textSecondary" component="h1" align="center" >{id !== undefined ? ' atualizar ' : ' cadastrar '} postagem</Typography>
            <TextField value={postagem.titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="titulo" label="titulo" margin="normal" fullWidth variant="filled" name='titulo'/>
            <TextField  className='text' value={postagem.texto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPostagem(e)} id="texto" label="texto" name="texto" margin="normal" fullWidth variant="filled" />
            <FormControl>
                <InputLabel className='inputSelect'variant="filled" id="demo-simple-select-helper-label" >Tema </InputLabel>
                <Select className='select'
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={(e) => buscaId(`/temas/${e.target.value}`, setTema, {
                        headers: {
                            'Authorization': token
                            }
                    })}>
                {
                    temas.map(tema => (
                        <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
                    ))
                }
                </Select>
                <FormHelperText>Escolha um tema para a postagem</FormHelperText>
                <Button className='btn' type="submit" variant="contained" color="primary" disabled={tema.id === 0}>
                    Finalizar
                </Button>
            </FormControl>
            </Stack>
        </form>
    </Container>
    </Box>
  )
}

export default CadastroPost