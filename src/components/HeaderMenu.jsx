import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import logo from "../assets/images/White-Blue-Logo.png";


export const HeaderMenu = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "#cccccc", backgroundColor: '#027EF3' }}
    >
      <Toolbar>
        {/* Typography for the title */}
        <Typography variant="h6" color="white" component="div">
          expa(n)
        </Typography>

        {/* Spacer to push the image to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Image inside the Toolbar */}
        <img src={logo} alt="Logo" style={{ height: '40px' }} />
      </Toolbar>
    </AppBar>
  );
};

