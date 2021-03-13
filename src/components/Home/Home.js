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

const PAGE_SIZE = 24;

const Home = () => {
    const [leagues, setLeagues] = useState([]);
    const [page, setPage] = useState(1);
    const [, setHeaderLeagueBadge] = useContext(HeaderLeagueBadgeContext);
    setHeaderLeagueBadge('');

    useEffect(() => {
        const url = 'https://www.thesportsdb.com/api/v1/json/1/all_leagues.php';
        fetch(url)
            .then(res => res.json())
            .then(data => setLeagues(oldState => [...oldState, ...data.leagues.slice(oldState.length, oldState.length + PAGE_SIZE)]));
            // functional update form of setState
            // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
    }, [page]);

    const classes = useStyles();

    return (
        leagues.length > 0
            ? <div className={classes.root}>
                <Grid container spacing={3}>
                    {
                        <InfiniteScroll
                            dataLength={leagues.length} //This is important field to render the next data
                            next={() => setPage(page + 1)}
                            hasMore={true}
                            loader={<LoadingCircle />}
                        >
                            {
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {
                                        leagues.map(league => <League key={league.idLeague} league={league} />)
                                    }
                                </div>
                            }
                        </InfiniteScroll>
                    }
                </Grid>
            </div>
            : <div style={{ position: "relative" }}><LoadingCircle /></div>
    );
};

export default Home;