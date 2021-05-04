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
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const drawerWidth = 180;

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
  slider: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  title: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  years: {
    marginRight: "20px"
  }
}));

const animals = [{
  id: 0,
  name: "Gato",
  p0: 20,
  pn: 3,
  pn1: 4
},
{
  id: 1,
  name: "Perro",
  p0: 20,
  pn: 3,
  pn1: 4
},
{
  id: 2,
  name: "Conejo",
  p0: 20,
  pn: 3,
  pn1: 4
}

]
let time = 0.5
export default function App() {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [pauseStopDisabled, setPauseStopDisabled] = useState(true)
  const [playDisabled, setPlayDisabled] = useState(false)
  const childRef = useRef();
  const [animal0P0, setAnimal0P0] = useState(0)
  const [animal0Pn, setAnimal0Pn] = useState(0)
  const [animal0Pn1, setAnimal0Pn1] = useState(0)
  const [animal1P0, setAnimal1P0] = useState(0)
  const [animal1Pn, setAnimal1Pn] = useState(0)
  const [animal1Pn1, setAnimal1Pn1] = useState(0)
  const [animal2P0, setAnimal2P0] = useState(0)
  const [animal2Pn, setAnimal2Pn] = useState(0)
  const [animal2Pn1, setAnimal2Pn1] = useState(0)
  // const [time, setTime] = useState(0.5)
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

  const handleSliderChange = (event, value) => {
    if (time !== value) {
      // setTime(value)
      time = value
      console.log(time)
      if (playDisabled) {
        console.log("fuck you")
        childRef.current.changeTimeSpeed(value)
      }
    }
  }

  const validateInput = () => {
    let inputs = [animal0P0, animal0Pn, animal0Pn1, animal1P0, animal1Pn, animal1Pn1, animal2P0, animal2Pn, animal2Pn1]
    let ok = true
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].toString() === '') {
        alert("no puede dejar espacio vacio, puede dejar 0 si no quiere hacer uso")
        ok = false
        return false
      } else if (inputs[i] % 1 !== 0) {
        alert("no puede poner animales no enteros")
        ok = false
        return false
      } else if (inputs[i] < 0) {
        alert("no puede poner numeros negativos")
        ok = false
        return false
      }
    }

    return true
  }
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
              disabled={playDisabled}
              onClick={() => {
                const ok = validateInput()
                console.log(ok)
                if (ok) {
                  setPauseStopDisabled(false);
                  setPlayDisabled(true);
                  childRef.current.play(animals, time);
                }
              }}
            >
              < PlayArrowIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton
              disabled={pauseStopDisabled}
              onClick={() => { childRef.current.pause(); if (playDisabled) { setPlayDisabled(false) } }}
            >
              < PauseIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton
              disabled={pauseStopDisabled}
              onClick={() => { childRef.current.stop(); setPauseStopDisabled(true); setPlayDisabled(false) }}
            >
              < StopIcon color='secondary' fontSize='large' />
            </IconButton>
            <Typography className={classes.years} color="primary" variant="h6" noWrap>
              Años: {0}
            </Typography>
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              Perros: {0}
            </Typography>
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              Gatos: {0}
            </Typography>
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              Conejos: {0}
            </Typography>
            <Button variant="contained" color='secondary' onClick={() => { childRef.current.resetCamera() }}>Home</Button>
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
              <InfoSharpIcon fontSize="large" />Ayuda
            </IconButton>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.slider}>
            <Typography gutterBottom>
              1 año es en segundos:
            </Typography>
            <Slider
              key={`slider-${time}`}
              defaultValue={time}
              step={0.5}
              min={0.5}
              max={3}
              onChange={handleSliderChange}
              aria-labelledby="discrete-slider-custom"
              valueLabelDisplay="auto"
              marks
            />
          </div>
          <Divider />

          <List key={0} dense>
            {/*Animal0*/}
            <ListItem dense key={0}>
              <Typography variant="h6">
                {animals[0].name}
              </Typography>
            </ListItem>

            <ListItem dense key={1}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[0].name}
                  value={animal0P0}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal0P0(e.target.value)}
                  startAdornment={<InputAdornment position="start">Po=</InputAdornment>}
                />
              </FormControl>
            </ListItem>

            <ListItem dense key={2}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[0].name + "pn"}
                  value={animal0Pn}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal0Pn(e.target.value)}
                  startAdornment={<InputAdornment position="start">Pn=</InputAdornment>}
                />
              </FormControl>
            </ListItem>

            <ListItem dense key={3}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[0].name + "Pn-1"}
                  value={animal0Pn1}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal0Pn1(e.target.value)}
                  startAdornment={<InputAdornment position="start">Pn-1=</InputAdornment>}
                />
              </FormControl>
            </ListItem>
            <Divider />
            {/*Animal1*/}
            <ListItem dense key={4}>
              <Typography variant="h6">
                {animals[1].name}
              </Typography>
            </ListItem>

            <ListItem dense key={5}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[1].name}
                  value={animal1P0}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal1P0(e.target.value)}
                  startAdornment={<InputAdornment position="start">Po=</InputAdornment>}
                />
              </FormControl>
            </ListItem>

            <ListItem dense key={6}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[1].name + "pn"}
                  value={animal1Pn}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal1Pn(e.target.value)}
                  startAdornment={<InputAdornment position="start">Pn=</InputAdornment>}
                />
              </FormControl>
            </ListItem>

            <ListItem dense key={7}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[1].name + "Pn-1"}
                  value={animal1Pn1}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal1Pn1(e.target.value)}
                  startAdornment={<InputAdornment position="start">Pn-1=</InputAdornment>}
                />
              </FormControl>
            </ListItem>
            <Divider />
            {/*Animal2*/}
            <ListItem dense key={8}>
              <Typography variant="h6">
                {animals[2].name}
              </Typography>
            </ListItem>

            <ListItem dense key={9}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[2].name}
                  value={animal2P0}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal2P0(e.target.value)}
                  startAdornment={<InputAdornment position="start">Po=</InputAdornment>}
                />
              </FormControl>
            </ListItem>

            <ListItem dense key={10}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[2].name + "pn"}
                  value={animal2Pn}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal2Pn(e.target.value)}
                  startAdornment={<InputAdornment position="start">Pn=</InputAdornment>}
                />
              </FormControl>
            </ListItem>

            <ListItem dense key={11}>
              <FormControl fullWidth variant="outlined">
                <OutlinedInput
                  id={animals[2].name + "Pn-1"}
                  value={animal2Pn1}
                  margin="dense"
                  type="number"
                  onChange={(e) => setAnimal2Pn1(e.target.value)}
                  startAdornment={<InputAdornment position="start">Pn-1=</InputAdornment>}
                />
              </FormControl>
            </ListItem>
            <Divider />
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

