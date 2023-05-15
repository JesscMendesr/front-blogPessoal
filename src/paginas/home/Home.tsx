import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import "./Home.css";

function home() {
  return (
    <>
      <Grid container xs={10} style={{ margin: "auto", position: "relative" }}>
        <video loop autoPlay muted>
          <source
            src="/src/assets/Vinheta introdução cinema antigo.mp4"
            type="video/mp4"
          />
        </video>
        <Grid item style={{ backgroundColor: "rgb(0, 0, 0, 0.8)" }}>
          <Box className="intro" display={"flex"} style={{ margin: "100px 0" }}>
            <Box>
              <h1
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "100px",
                  margin: "20px 0",
                }}
              >
                Cinematize
              </h1>
              <p
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "64px",
                  display: "inline",
                  fontWeight: "400",
                }}
              >
                Críticas, resenhas, opniões e tudo mais sobre a sétima arte.
              </p>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default home;
