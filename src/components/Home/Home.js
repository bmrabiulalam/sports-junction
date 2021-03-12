import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import League from '../League/League';
import { HeaderLeagueBadgeContext } from '../../App';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const PAGE_NUMBER = 1;
const PAGE_SIZE = 20;

const Home = () => {
    const [leagues, setLeagues] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(PAGE_NUMBER);
    const [, setHeaderLeagueBadge] = useContext(HeaderLeagueBadgeContext);
    setHeaderLeagueBadge('');

    useEffect(() => {
        const url = 'https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
        fetch(url)
            .then(res => res.json())
            .then(data => setLeagues([...leagues, ...data.leagues.slice(leagues.length, leagues.length + PAGE_SIZE)]));
    }, [pageNumber, leagues]);

    const classes = useStyles();

    return (
        leagues.length > 0
            ? <div className={classes.root}>
                <Grid container spacing={3}>
                    {
                        <InfiniteScroll
                            dataLength={leagues.length} //This is important field to render the next data
                            next={() => setPageNumber(pageNumber + 1)}
                            hasMore={true}
                            loader={<LoadingCircle style={{}} />}
                            style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
                        >
                            {
                                leagues.map(league => (
                                    <League key={league.idLeague} league={league} />
                                ))
                            }
                        </InfiniteScroll>
                    }
                </Grid>
            </div>
            : <div style={{ position: "relative" }}><LoadingCircle /></div>
    );
};

export default Home;