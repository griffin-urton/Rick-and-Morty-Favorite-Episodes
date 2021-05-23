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
            flexGrow: 2,
        },
        content: {
            padding: '8px',
            "&:last-child": {
                paddingBottom: 0
            }
        },
        card: {
            margin: theme.spacing(2),
            width: 300,
            height: 250,
            boxShadow: '0px 1px 1px 2px rgba(0, 0, 0, 0.25)'
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
        grid: {
            display: 'flex'
        }
    }),
);


export default function EpisodesList(props: any): JSX.Element[] {
    const { episodes, toggleFavAction, favorites, store } = props
    const { state, dispatch } = store
    const classes = useStyles()

    return episodes.map((episode: IEpisode) => {
        return (

            < Grid item className={classes.root} >
                <Card className={classes.card}>
                    <CardMedia className={classes.img} component='img' image={episode.name === 'TBA' ? 'https://as1.ftcdn.net/v2/jpg/01/39/46/84/1000_F_139468410_4vsFXKKlr42g4jWSDlwbHvy1IsnJeScZ.jpg' : episode.image.medium} title={`Rick and Mort ${episode.name}`} />
                    <CardContent className={classes.content}>
                        <Grid container justify='space-between'>
                            <Grid item xs={12}>
                                <Typography variant='h6' style={{ fontSize: '1.1rem' }}>
                                    {episode.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant='body2' color='textSecondary'>
                                    S{episode.season}E{episode.number}
                                </Typography>
                            </Grid>
                            <Grid container item xs={3} justify='flex-end'>
                                <IconButton aria-label='favorite' color={favorites.includes(episode) ? 'primary' : 'secondary'} onClick={() => toggleFavAction(state, dispatch, episode)}>
                                    <FavoriteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid >

        )
    })
}
