import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography, Grid } from "@material-ui/core";
import { Box, Stack } from "@mui/material";

function Footer() {
  return (
    <footer style={{ width: "100%", margin: "80px 0" }}>
      <Grid container justifyContent={"center"}>
        <Grid container xs={6}>
          <Stack gap={2}>
            <Box>
              <Typography variant="h5" align="center" gutterBottom>
                Siga-nos nas redes sociais{" "}
              </Typography>
            </Box>
            <Box
              margin={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={4}
            >
              <a
                href="https://www.facebook.com/generationbrasil"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon style={{ fontSize: 40, color: "white" }} />
              </a>
              <a
                href="https://www.instagram.com/generationbrasil/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon style={{ fontSize: 40, color: "white" }} />
              </a>
              <a
                href="https://www.linkedin.com/school/generationbrasil/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon style={{ fontSize: 40, color: "white" }} />
              </a>
            </Box>
            <Box>
              <Box paddingTop={1}>
                <Typography
                  variant="subtitle2"
                  align="center"
                  gutterBottom
                  style={{ color: "white" }}
                >
                  © 2023 Copyright: Jéssica Mendes
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid container xs={4}>
          <Stack gap={2}>
            <Box>
              <Typography variant="subtitle1" style={{ color: "white" }}>
                home
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" style={{ color: "white" }}>
                Postagens
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" style={{ color: "white" }}>
                Temas
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1" style={{ color: "white" }}>
                cadastrar tema
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
