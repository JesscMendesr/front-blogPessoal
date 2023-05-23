import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import "./Home.css";
import TabPostagens from "../../components/postagens/tabPostagens/TabPostagens";


function home() {
  return (
    <>
      <Grid className="container" container xs={10} style={{ margin: "auto", position: "relative" }}>
        <video height="495px" loop autoPlay muted>
          <source
            src="/src/assets/Vinheta introdução cinema antigo.mp4"
            type="video/mp4"
          />
        </video>
        <Box paddingX={20} className="caixa">
          <Box className="intro" display={"flex"} color={"white"} my={"100px"}>
            <Box>
              <Box mb={5}>
                <Typography variant="h1">Cinematize</Typography>
              </Box>
              <Typography variant="h2">
                Críticas, resenhas, opniões e tudo mais sobre a sétima arte.
              </Typography>
              <Box  marginY={4}>
                <Button size="large" className='botao3'variant="outlined" >Ver postagens</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid xs={12} className="postagens">
          <TabPostagens/>
        </Grid>
      </Grid>

    </>
  );
}

export default home;
