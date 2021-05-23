import React from 'react'
import { IEpisode } from './interfaces'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            margin: '5px 20px',
            width: 300,
            minHeight: 80,
            justifyContent: 'space-between',
            boxShadow: '0px 1px 1px 2px rgba(0, 0, 0, 0.25)'
        },
        details: {
            display: 'flex',
            flexGrow: 5,
            flexDirection: 'column',
            padding: 8,
            justifyContent: 'flex-start'
        },
        content: {
            flex: '1 0 auto',
        },
        thumbnail: {
            minWidth: 80,
            minHeight: 80,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        favoriteIcon: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
    }),
);


export default function FavThumbnails(props: any): JSX.Element[] {
    const { episodes, toggleFavAction, favorites, store } = props
    const { state, dispatch } = store
    const classes = useStyles()

    return episodes.map((episode: IEpisode) => {
        return (

            <Card className={classes.root}>
                <CardMedia className={classes.thumbnail} image={episode.name === 'TBA' ? 'https://as1.ftcdn.net/v2/jpg/01/39/46/84/1000_F_139468410_4vsFXKKlr42g4jWSDlwbHvy1IsnJeScZ.jpg' : episode.image.medium} title={`Rick and Mort ${episode.name}`} />
                <div className={classes.details}>
                    <Typography variant='subtitle1'>{episode.name}</Typography>
                    <Typography variant='body2'>S{episode.season}E{episode.number}</Typography>
                </div>
                <div className={classes.favoriteIcon}>
                    <IconButton aria-label='favorite' color='primary' onClick={() => toggleFavAction(state, dispatch, episode)}>
                        <FavoriteIcon />
                    </IconButton>
                </div>
            </Card>
        )
    })
}