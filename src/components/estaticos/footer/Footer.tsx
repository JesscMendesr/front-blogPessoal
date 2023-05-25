import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography, Grid } from "@material-ui/core";
import { Box, Stack } from "@mui/material";
import './Footer.css'
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";

function Footer() {
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  var footerComponent;

  if(token != ""){
    footerComponent = <Grid container justifyContent="center" className="box1">
    <Grid container justifyContent="center" xs={6}>
      <Stack gap={2}>
        <Box>
          <Typography variant="h5" align="center" gutterBottom>
            Siga-nos nas redes sociais{" "}
          </Typography>
        </Box>
        <Box margin={1} display="flex" alignItems="center" justifyContent="center" gap={4}>
          <a href="https://www.facebook.com/generationbrasil" target="_blank" rel="noopener noreferrer">
            <FacebookIcon className="redes"/>
          </a>
          <a href="https://www.instagram.com/generationbrasil/" target="_blank"
            rel="noopener noreferrer">
            <InstagramIcon className="redes"/>
          </a>
          <a href="https://www.linkedin.com/school/generationbrasil/" target="_blank" rel="noopener noreferrer"
          >
            <LinkedInIcon className="redes" />
          </a>
        </Box>
        <Box>
          <Box paddingTop={1}>
            <Typography variant="subtitle2" align="center" gutterBottom>
              © 2023 Copyright: Jéssica Mendes
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Grid>
    <Grid container  xs={4}>
      <Stack gap={2}>
        <Box>
          <Typography variant="subtitle1">
            home
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">
            Postagens
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">
            Temas
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1">
            cadastrar tema
          </Typography>
        </Box>
      </Stack>
    </Grid>
  </Grid>
  }

  return (
    <> 
      {footerComponent}
    </>
  );
}

export default Footer;
