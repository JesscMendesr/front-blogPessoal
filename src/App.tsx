import Home from "./paginas/home/Home";
import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import { Grid } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <>
      <Grid container xs={10} style={{ margin: "auto" }}>
        <Navbar />
        <Home />
        <Footer />
      </Grid>
    </>
  );
}

export default App;
