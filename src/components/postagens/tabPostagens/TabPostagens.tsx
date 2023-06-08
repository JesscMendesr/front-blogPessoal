import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagens from '../listaPostagens/ListaPostagem';
import './TabPostagens.css';
import Perfil from '../../perfil/Perfil';
import ListaTema from '../../temas/listaTema/ListaTema';

function TabPostagens() {
  const [value, setValue] = useState('1')
  function handleChange(event: React.ChangeEvent<{}>, newValue: string){
      setValue(newValue);
  }
    return (
      <>
        <TabContext value={value}>
          <AppBar className='tab' position="static">
            <Tabs centered indicatorColor="secondary" onChange={handleChange}>
              <Tab label="Todas as postagens" value="1"/>
              <Tab label="Todos os temas" value="2" />
            </Tabs>
          </AppBar>
          <TabPanel value="1" >
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <ListaPostagens />
            </Box>
          </TabPanel>
          <TabPanel value="2">
          <Box display="flex" flexWrap="wrap" justifyContent="center">
              <ListaTema />
            </Box>
          </TabPanel>
        </TabContext>
      </>
    );
  } 


export default TabPostagens;