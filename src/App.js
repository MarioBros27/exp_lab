import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import Three from './js/three'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // height: 'flex',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
const animals = [{
  id: 0,
  name: "Gato",
  Po: 0,
  Pn: 0,
  "Pn-1": 0
},
{
  id: 1,
  name: "Perro",
  Po: 0,
  Pn: 0,
  "Pn-1": 0
},
{
  id: 2,
  name: "Conejo",
  Po: 0,
  Pn: 0,
  "Pn-1": 0
}

]
export default function App() {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(true);
  const childRef = useRef();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);

  };
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({

        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: green,
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Three ref={childRef} />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <Toolbar variant='dense'>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <IconButton
              onClick={() => { }}
            >
              < PlayArrowIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton
              onClick={() => { }}
            >
              < PauseIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton
              onClick={() => { }}
            >
              < StopIcon color='secondary' fontSize='large' />
            </IconButton>
            <Typography variant="h6" noWrap>
              Años: {0}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton >
              <InfoSharpIcon fontSize="large" />Fórmulas
            </IconButton>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />

          <List key={0} dense>
            {animals.map(animal => {
              return (
                <>
                  <ListItem key={animal.id + 100}>
                    <Typography variant="h5">
                      {animal.name}
                    </Typography>
                  </ListItem>
                  <ListItem dense key={animal.id}>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        id={animal.name}
                        value={animal['Po']}
                        margin="dense"
                        // value={values.amount}
                        // onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">Po=</InputAdornment>}
                      // labelWidth={60}
                      />

                    </FormControl>

                  </ListItem>
                  <ListItem>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        id={animal.name + "Pn"}
                        value={animal['Pn']}
                        margin="dense"
                        // value={values.amount}
                        // onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">Pn=</InputAdornment>}
                      // labelWidth={60}
                      />
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl fullWidth variant="outlined">
                      <OutlinedInput
                        id={animal.name + "Pn-1"}
                        value={animal['Pn-1']}
                        margin="dense"
                        // value={values.amount}
                        // onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">Pn-1=</InputAdornment>}
                      // labelWidth={60}
                      />
                    </FormControl>
                  </ListItem>
                  <Divider />
                </>
              )
            })}
          </List>
        </Drawer>

        {/* <main className={classes.content}>
        <div className={classes.toolbar} /> 
        <Three ref={childRef} width={width} />
      </main> */}
      </div>
    </ThemeProvider >
  );
}

