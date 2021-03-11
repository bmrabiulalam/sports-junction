import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import League from '../League/League';
import { HeaderLeagueBadgeContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Home = () => {
    const [leagues, setLeagues] = useState([]);
    const [headerLeagueBadge, setHeaderLeagueBadge] = useContext(HeaderLeagueBadgeContext);
    setHeaderLeagueBadge('');

    useEffect(() => {
        const url = 'https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
        fetch(url)
        .then(res => res.json())
        .then(data => setLeagues(data.leagues.slice(0, 20)));
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} style={{textAlign: 'center'}}>
                {
                    leagues.map(league => {
                        return  <Grid item key={league.idLeague} item xs={12} sm={6} md={4} lg={3}>
                                    <League league={league} />
                                </Grid>
                    })
                }
            </Grid>
        </div>
    );
};

export default Home;