import React from 'react'
import { Store } from './Store'
import { IEpisodeProps } from './interfaces'
import { toggleFavAction } from './Actions'
import { Grid, Paper } from '@material-ui/core'

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'))

export default function FavPage() {
    const { state, dispatch } = React.useContext(Store)

    // React.useEffect(() => {
    //     state.favorites.length === 0 && fetchDataAction(dispatch)
    // })

    const props: IEpisodeProps = {
        episodes: state.favorites,
        store: { state, dispatch },
        toggleFavAction,
        favorites: state.favorites
    }
    return (
        <React.Suspense fallback={<div>loading...</div>}>
            <Paper style={{ backgroundColor: '#303030' }}>
                <Grid container spacing={1} justify='center'>
                    <EpisodeList {...props} />
                </Grid>
            </Paper>
        </React.Suspense>
    )
}
