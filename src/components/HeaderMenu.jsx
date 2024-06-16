import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const HeaderMenu = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "#cccccc" }}
      color="white"
    >
      <Toolbar>
        <Typography variant="h6" color="#037ef3" component="div">
          expa(n)
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
