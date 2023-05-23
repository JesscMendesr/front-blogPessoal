import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import './ListaPostagens.css'

function ListaPostagens() {
  return (
    <Box  m={4} maxWidth='25%' >
      <Card className='card-posts'>
      <CardMedia
        component="img"
        alt="green iguana"
        
        image="https://uploads.jovemnerd.com.br/wp-content/uploads/2023/03/close_capa__abt30cjp.jpg"
      />
      <CardContent className='card-posts'>
        <Typography  className='text-underline' gutterBottom variant="h5" component="div">
          Crítica Close
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          Lançamentos 2023
        </Typography>
        <Typography className='bodyText' variant="body2">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque numquam vero sint dicta molestiae. Quidem ipsum vel voluptas, doloremque nisi voluptatem quia placeat dolor a. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque numquam vero sint dicta molestiae. Quidem ipsum vel voluptas...
        </Typography>
        <CardActions>
          <Button className='btnAtualizar'variant='outlined' size="small">Atualizar</Button>
          <Button variant='outlined' className="btnDeletar" size="small">Deletar</Button>
        </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ListaPostagens