import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import logo from "../assets/logo-sil-sistemas.svg";

const Navbar = () => (
  <AppBar
    position="static"
    color="default"
    elevation={0} // Remove a sombra
    sx={{
      boxShadow: "none",
      backgroundColor: "#a8e1fb",
    }} // Garante que não há sombra
  >
    <Toolbar sx={{ height: 300, minHeight: "300px !important" }}>
      <Box flex={1} />
      <Box display="flex" alignItems="center" justifyContent="center" flex={1}>
        <img src={logo} alt="Logo" style={{ height: 50 }} />
      </Box>
      <Box flex={1} />
    </Toolbar>
  </AppBar>
);

export default Navbar;
