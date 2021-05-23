import React from 'react'
import { Store } from './Store'
import { IEpisodeProps } from './interfaces'
import { fetchDataAction, toggleFavAction } from './Actions'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        },
        grid: {
            display: 'flex',
            justifyContent: 'center',
            paddingRight: '3%',
            paddingLeft: '3%',
        },
    }),
);

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'))

export default function HomePage() {
    const { state, dispatch } = React.useContext(Store)
    const classes = useStyles()

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction(dispatch)
    })

    const props: IEpisodeProps = {
        episodes: state.episodes,
        store: { state, dispatch },
        toggleFavAction,
        favorites: state.favorites
    }

    return (
        <React.Fragment>
            <React.Suspense fallback={<div>loading...</div>}>
                <Paper style={{ backgroundColor: '#303030' }}>
                    <Grid className={classes.grid} container spacing={1}>
                        <EpisodeList {...props} />
                    </Grid>
                </Paper>
            </React.Suspense>
        </React.Fragment>
    )
}
