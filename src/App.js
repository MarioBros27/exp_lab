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
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Formula1 from '../src/img/formula1.png'
import Formula2 from '../src/img/formula2.png'
import Box from '@material-ui/core/Box';

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
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogPaper: {
    minHeight: '85vh',
    maxHeight: '85vh',
    minWidth: '140vh',
    maxWidth: '140vh',
  },
}));
const DialogContent = withStyles((theme) => ({
  root: {

  },
}))(MuiDialogContent);

const animals = [{
  id: 0,
  name: "Rojo",
  p0: 2,
  pn: 4,
  pn1: 3,
  p: 0
},
{
  id: 1,
  name: "Azul",
  p0: 2,
  pn: 4,
  pn1: 3,
  p: 0
},
{
  id: 2,
  name: "Verde",
  p0: 2,
  pn: 4,
  pn1: 3,
  p: 0
}

]
let time = 0.5
export default function App() {
  const classes = useStyles();
  // const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [pauseDisabled, setPauseDisabled] = useState(true)
  const [stopDisabled, setStopDisabled] = useState(true)
  const [playDisabled, setPlayDisabled] = useState(false)
  const [showInfo, setShowInfo] = useState(true)
  const childRef = useRef();
  const [animal0P, setAnimal0P] = useState(animals[0].p0)
  const [animal0P0, setAnimal0P0] = useState(animals[0].p0)
  const [animal0Pn, setAnimal0Pn] = useState(animals[0].pn)
  const [animal0Pn1, setAnimal0Pn1] = useState(animals[0].pn1)
  const [animal1P, setAnimal1P] = useState(animals[1].p0)
  const [animal1P0, setAnimal1P0] = useState(animals[1].p0)
  const [animal1Pn, setAnimal1Pn] = useState(animals[1].pn)
  const [animal1Pn1, setAnimal1Pn1] = useState(animals[1].pn1)
  const [animal2P, setAnimal2P] = useState(animals[2].p0)
  const [animal2P0, setAnimal2P0] = useState(animals[2].p0)
  const [animal2Pn, setAnimal2Pn] = useState(animals[2].pn)
  const [animal2Pn1, setAnimal2Pn1] = useState(animals[2].pn1)
  const [years, setYears] = useState(0)
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
      // console.log(time)
      if (playDisabled) {
        childRef.current.changeTimeSpeed(value)
      }
    }
  }

  const validateInput = () => {
    let inputs = [animal0P0, animal0Pn, animal0Pn1, animal1P0, animal1Pn, animal1Pn1, animal2P0, animal2Pn, animal2Pn1]
    let ok = true
    if (animal0Pn < animal0Pn1 || animal1Pn < animal1Pn1 || animal2Pn < animal2Pn1) {
      alert("La poblaci??n de este a??o no puede ser menor a la del anterior ya que este programa no simula decrecimientos")
      return false
    }
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
  const addNewAnimalsValues = ()=>{
    animals[0].p0 = parseInt(animal0P0)
    animals[0].pn = parseInt(animal0Pn)
    animals[0].pn1 = parseInt(animal0Pn1)
    animals[1].p0 = parseInt(animal1P0)
    animals[1].pn = parseInt(animal1Pn)
    animals[1].pn1 = parseInt(animal1Pn1)
    animals[2].p0 = parseInt(animal2P0)
    animals[2].pn = parseInt(animal2Pn)
    animals[2].pn1 = parseInt(animal2Pn1)

  }
  const handleStop = ()=>{
    setPauseDisabled(true);
    setStopDisabled(true);
    setPlayDisabled(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Three ref={childRef} handleStop={handleStop}animals={animals} setYears={setYears} setAnimal0P={setAnimal0P} setAnimal1P={setAnimal1P} setAnimal2P={setAnimal2P} />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{ background: '#000000', boxShadow: 'none' }}
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
                if (pauseDisabled && !stopDisabled) {//Resume
                  // console.log("resume")
                  setPauseDisabled(false)
                  childRef.current.resume();
                } else {//Play
                  const ok = validateInput()
                  // console.log(ok)
                  if (ok) {
                    setPauseDisabled(false);
                    setStopDisabled(false);
                    setPlayDisabled(true);
                    //TODO add to the list of animals the new values
                    addNewAnimalsValues();
                    childRef.current.play(animals, time);
                  }
                }
              }}
            >
              < PlayArrowIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton
              disabled={pauseDisabled}
              onClick={() => {
                childRef.current.pause();
                if (playDisabled) { setPlayDisabled(false) }
                setPauseDisabled(true)
              }}
            >
              < PauseIcon color='secondary' fontSize='large' />
            </IconButton>
            <IconButton
              disabled={stopDisabled}
              onClick={() => {
                handleStop()
                childRef.current.stop();
              }}
            >
              < StopIcon color='secondary' fontSize='large' />
            </IconButton>
            <Typography className={classes.years} color="primary" variant="h6" noWrap>
              A??os: {years}
            </Typography>
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              {'Rojos:'} {animal0P}
            </Typography>
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              {'Azules:'} {animal1P}
            </Typography>
            <Typography className={classes.title} color="primary" variant="h6" noWrap>
              {'Verdes:'} {animal2P}
            </Typography>
            <Button variant="contained" color='secondary' onClick={() => { childRef.current.resetCamera() }}>Camara Home</Button>
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
            <IconButton onClick={() => { if (pauseDisabled) { setShowInfo(true) } }}>
              <InfoSharpIcon fontSize="large" />Ayuda
            </IconButton>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <div className={classes.slider}>
            <Typography gutterBottom>
              Lentitud tiempo:
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
                  inputProps={{ min:0 }}
                  onChange={(e) => { setAnimal0P0(e.target.value); setAnimal0P(e.target.value); childRef.current.updateP0(0, e.target.value) }}
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
                  inputProps={{ min:0 }}
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
                  inputProps={{ min:0 }}
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
                  inputProps={{ min:0 }}
                  onChange={(e) => { setAnimal1P0(e.target.value); setAnimal1P(e.target.value); childRef.current.updateP0(1, e.target.value) }}
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
                  inputProps={{ min:0 }}
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
                  inputProps={{ min:0 }}
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
                  inputProps={{ min:0 }}
                  onChange={(e) => { setAnimal2P0(e.target.value); setAnimal2P(e.target.value); childRef.current.updateP0(2, e.target.value) }}
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
                  inputProps={{ min:0 }}
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
                  inputProps={{ min:0 }}
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
        <Dialog classes={{ paper: classes.dialogPaper }} aria-labelledby="customized-dialog-title" open={showInfo}>
          <DialogTitle disableTypography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => { setShowInfo(false) }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent >
            <Grid container direction="row">
              <Grid item xs={6}>
                <Typography align="center" variant="h5" gutterBottom>Matem??ticas</Typography>

                <Grid container>
                  <Box>
                    <img style={{ width: "95%" }} src={Formula1} />

                  </Box>
                </Grid>
                <Typography gutterBottom>
                  Po = Poblaci??n inicial<br />
                  T = Tasa de crecimiento<br />
                  t = Tiempo en a??os<br />
                </Typography>
                <Grid container>
                  <Box>
                    <img style={{ width: "90%" }} src={Formula2} />

                  </Box>
                </Grid>
                <Typography gutterBottom>
                  Pn = Poblaci??n de un a??o<br />
                  Pn-1 = Poblaci??n de un a??o anterior al de Pn
                </Typography>
                <Typography variant="subtitle1" color="secondary">
                  <strong>Restricciones:</strong>
                </Typography>
                <Typography gutterBottom>
                  {"Pn > 0 y Pn-1 > 0 ; Pn > Pn-1"}<br />
                </Typography>
              </Grid>
              {/* <Divider flexItem style={{ marginLeft: "-5px",marginRight:"5px" }} orientation="vertical"/> */}

              <Grid item xs={6}>
                <Typography align="center" variant="h5" gutterBottom>C??mo usar la aplicaci??n</Typography>
                <Typography gutterBottom>
                  1. Modifica las variables y la velocidad del paso de los a??os(1 a??o = n segundos)<br />
                  2. Selecciona el bot??n Play. Puedes cerrar la barra de configuraci??n si quieres.
                  3. En este estado puedes: <br />
                  {"    a. Pausar: detiene momentariamente."} <br />
                  {"    b. Reaundar(play): continua la simulaci??n."} <br />
                  {"    c. Detener: termina la simulaci??n y se limpia la pantalla"} <br /> </Typography>
                <Typography gutterBottom>
                  Si no quieres comparar otra poblaci??n, deja los campos de Po en 0
          </Typography>
                <Typography gutterBottom>
                  El bot??n de CAMARA HOME es para que en la configuraci??n del ambiente puedas explorar con el rat??n, y si necesitas regresar a la posici??n inicial de la c??mara este te devuelve
          </Typography>
                <Typography gutterBottom>
                  Esta ventana la puedes volver a ver en Ayuda que est?? arriba en la barra lateral siempre y cuando no est?? corriendo la simulaci??n.
                </Typography>
                <Typography color="primary" gutterBottom>
                  Si se te detiene antes de lo que quieres simular sube el tiempo que dura un a??o en el deslizador de lentitud.</Typography>
              </Grid>
            </Grid>

          </DialogContent>

        </Dialog>
      </div>

    </ThemeProvider >
  );
}

