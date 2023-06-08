import React, { useEffect, useState } from "react";
import { Grid, AppBar, Toolbar, Typography, Tooltip, MenuItem, Divider, ListItemIcon, Hidden, Drawer, List, ListItem } from "@material-ui/core";
import { Box, Stack, Button, IconButton, Avatar, Menu } from "@mui/material";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { addToken } from "../../../store/tokens/actions";
import {toast} from 'react-toastify';
import { ChevronRight, PersonAdd, Settings } from "@material-ui/icons";
import { Logout } from "@mui/icons-material";
import User from "../../../models/User";
import { buscaId } from "../../../services/Service";
import ModalPostagem from "../../postagens/modalPostagem/ModalPostagem";
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';



function Navbar() {
  const userId = useSelector<TokenState, TokenState['id']>(
    (state) => state.id
    )

    const [opens, setOpen] = useState(false)

    const [usuario, setUsuario] = useState<User>({
      id: +userId,
      foto: '',
      nome: '',
      usuario: '',
      senha: '',
      postagem: null,
      })

      useEffect(() => {
        getUserById(+userId)
        }, []);

      async function getUserById(id: number) {
        await buscaId(`/usuarios/${id}`, setUsuario, {
        headers: {Authorization: token}
        })
        }





  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  let navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );



  function goLogout(){
    dispatch(addToken(''));
    toast.info('Usuário deslogado',{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    navigate('/login')
  }  

  var navbarComponent;

  if(token != ''){
    navbarComponent = <AppBar position="static" className="navbar">
    <Toolbar>
      <Grid container alignItems={"center"} justifyContent={"space-between"}>

        <Box className="cursor">
          <Typography variant="h5" color="inherit">
            BlogPessoal
          </Typography>
        </Box>
        <Stack alignItems={"center"} justifyContent="start" flexDirection={"row"} gap={"40px"}>
        <Hidden xsDown>
          <Link className="link" to='/home'>
            <Box className="item-menu" p={1} mx={1}>
              <Typography variant="subtitle1" color="inherit">
                home
              </Typography>
            </Box>
          </Link>
          <Link className="link" to='/postagens'>
            <Box p={1} className="item-menu" mx={1}
            >
              <Typography variant="subtitle1" color="inherit">
                postagens
              </Typography>
            </Box>
          </Link>
          <Link className='link'to='/temas'>
          <Box
            p={1}
            className="item-menu"
            mx={1}
          >
            <Typography variant="subtitle1" color="inherit">
              temas
            </Typography>
          </Box>
          </Link>
          <Link className='link' to='/formularioTema'>
          <Box p={1} className="item-menu" mx={1}>
            <Typography variant="subtitle1" color="inherit">
              cadastrar tema
            </Typography>
          </Box>
          </Link>
          <Box >
            <ModalPostagem/>
        </Box>
        </Hidden>
        </Stack>
        <Hidden xsDown>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={usuario?.foto} sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu className="menu-perfil"
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link className="reset-link color-b" to={'/perfil'}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Editar Perfil
        </MenuItem>
        </Link>
        <MenuItem onClick={goLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </Hidden>
      <Hidden smUp>
        <IconButton>
          <MenuIcon className="icon" onClick={() => setOpen(true)} />
        </IconButton> 
      </Hidden>
        <SwipeableDrawer  
        anchor="right" 
        open={opens} 
        onOpen={() => setOpen(true)} 
        onClose={() => setOpen(false)}>
          <div>
          <IconButton>
            <ChevronRight onClick={() => setOpen(false)}/>
          </IconButton>
          </div>
          <Divider/>
          <List>
            <Link className="reset-link color-b" to={'/perfil'}>
          <ListItem>
              <Typography>Editar Perfil</Typography>
            </ListItem>
            </Link>
            <Link className="reset-link color-b" to={'/home'}>
            <ListItem>
              <Typography>Home</Typography>
            </ListItem>
            </Link>
            <Link className="reset-link color-b" to='/postagens'>
            <ListItem>
              <Typography>Postagens</Typography>
            </ListItem>
            </Link>
            <Link className="reset-link color-b" to='/temas'>
            <ListItem>
              <Typography>Temas</Typography>
            </ListItem>
            </Link>
            <Link className="reset-link color-b" to='/formularioTema'>
            <ListItem>
              <Typography>Cadastrar tema</Typography>
            </ListItem>
            </Link>
            <Link className="reset-link color-b" to='/formularioPostagem'>
            <ListItem>
              <Typography>Escrever Post</Typography>
            </ListItem>
            </Link>
          </List>
        </SwipeableDrawer>
      </Grid>
    </Toolbar>
  </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
