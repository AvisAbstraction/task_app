import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  Toolbar,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  appBar: {
    width: "100%",
  },
  title: {
    fontSize: 20,
  },
}));

export function Navbar({ handleLogout }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" className={classes.title}>
                  Todo App
                </Typography>
              </Grid>
              <Grid item>
                <Button>
                  <img
                    src="https://via.placeholder.com/40"
                    style={{ borderRadius: "50%" }}
                  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
