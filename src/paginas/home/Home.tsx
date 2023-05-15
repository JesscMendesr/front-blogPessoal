import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import "./Home.css";

function home() {
  return (
    <>
      <Grid
        className="container"
        container
        xs={12}
        md={10}
        style={{ margin: "auto", position: "relative" }}
      >
        <video height="495px" loop autoPlay muted>
          <source
            src="/src/assets/Vinheta introdução cinema antigo.mp4"
            type="video/mp4"
          />
        </video>
        <Grid item style={{ backgroundColor: "rgb(0, 0, 5, 0.8)" }}>
          <Box className="intro" display={"flex"} color={"white"} my={"100px"}>
            <Box>
              <Box mb={5}>
                <Typography variant="h1">Cinematize</Typography>
              </Box>
              <Typography variant="h2">
                Críticas, resenhas, opniões e tudo mais sobre a sétima arte.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default home;
