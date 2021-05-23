import React from 'react'
import { Store } from './Store'
import { Link, Switch, Route } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiSwitch from '@material-ui/core/Switch';
import { createStyles, Theme, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import FavPage from './FavPage'
import HomePage from './HomePage'
import { IEpisodeProps } from './interfaces';
import { toggleFavAction, toggleIntellectual, removeAll } from './Actions';
import { removeAllListeners } from 'process';
import { Paper } from '@material-ui/core';

const FavList = React.lazy<any>(() => import('./FavThumbnails'))

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(0),
    },
  }),
)

const theme =

  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#8BCF21'
      },
      secondary: {
        main: '#E9',
      },
      success: {
        main: '#8BCF21',
      },
    },
    overrides: {
      // Style sheet name ⚛️
      MuiButton: {
        // Name of the rule
        root: {
          // Some CSS
          borderRadius: 3,
          border: 0,
          height: 24,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px',
          margin: '10px',
          minWidth: '150px'
        },

        label: {
          color: '#FFF',
          fontFamily: 'Roboto'
        },
      },
      // MuiPaper: {
      //   // Name of the rule
      //   root: {
      //     // Some CSS
      //     borderRadius: 0,
      //     border: 0,
      //     height: 24,
      //     padding: '0 30px',
      //     boxShadow: '0 3px 5px 2px',
      //     margin: '10px',
      //     minWidth: '150px'
      //   },
      // },
    },
  });


export default function App(props: any): JSX.Element {
  const { state, dispatch } = React.useContext(Store)
  const [drawer, setDrawer] = React.useState({
    isOpen: false
  })
  // const [switchState, setSwitchState] = React.useState({
  //   checked: state.checked
  // })

  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    setDrawer({ ...Drawer, isOpen: open })
  }

  const toggleSwitch = () => {
    dispatch({ ...state, checked: !state.checked })
    if (state.checked) {
      removeAll(dispatch)
    }
    else {
      toggleIntellectual(dispatch)
    }
  }

  const favs: IEpisodeProps = {
    episodes: state.favorites,
    store: { state, dispatch },
    toggleFavAction: toggleFavAction,
    favorites: state.favorites
  }
  return (

    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Paper className='header' square>
          <div>
            <img width='300' src='https://help.redbubble.com/hc/article_attachments/360002309526/Rick_and_Morty_-_logo__English_.png' alt='rick and mort logo' />
            <h1 className='title' >Pick your favorite!</h1>
          </div>
          <div style={{ position: "absolute", right: 0, top: 35 }}>
            <div>

              <Button variant='contained' color='primary' component={Link} to={'/'}>Home</Button>

            </div>
            <div>
              <Button variant='contained' color='primary' onClick={toggleDrawer(true)}>Favs ({state.favorites.length})</Button>
              <React.Suspense fallback={<div>loading...</div>}>
                <Drawer anchor='right' open={drawer.isOpen} onClose={toggleDrawer(false)}>
                  <Button style={{ marginTop: 20, marginBottom: 8 }} variant='contained' color='primary' component={Link} to={'/favorites'} onClick={toggleDrawer(false)}>See All</Button>
                  <Divider style={{ marginTop: 8, marginBottom: 10 }} variant='middle' />
                  <FavList {...favs} />
                </Drawer>
              </React.Suspense>
            </div>
            <div>
              <FormControlLabel
                control={<MuiSwitch checked={state.checked} onChange={toggleSwitch} color='primary' />}
                label='I am an Intellectual'
              />
            </div>
          </div>
        </Paper>
        <Switch>
          <Route path='/favorites'>
            <FavPage />
          </Route>

          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </ThemeProvider>
      {props.children}
    </React.Fragment>
  )
}