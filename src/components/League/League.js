import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { HeaderLeagueBadgeContext } from '../../App';

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
    },
});

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #3bb739 10%, #0bab84 90%)',
        borderRadius: 8,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const StyledCardMedia = withStyles({
    /* Styles applied to the root element. */
    root: {
        backgroundSize: 'contain',
        marginTop: '10px',
    },
    /* Styles applied to the root element if `component="picture or img"`. */
    img: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'contain',
    },
})(CardMedia);

const League = (props) => {
    const classes = useStyles();

    const { idLeague, strLeague, strSport, strLeagueAlternate } = props.league;
    const [leagueBadge, setLeagueBadge] = useState('');
    const [headerLeagueBadge, setHeaderLeagueBadge] = useContext(HeaderLeagueBadgeContext);

    useEffect(() => {
        const url = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${idLeague}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setLeagueBadge(data.leagues[0].strBadge));
    }, [idLeague]);

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <StyledCardMedia
                    component="img"
                    alt={strLeague}
                    height="150"
                    image={leagueBadge}
                    title={strLeague}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {strLeague}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Sports Type: {strSport}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                <Link to={`/league/${idLeague}/details`} style={{textDecoration: 'none'}}>
                    <StyledButton onClick={() => setHeaderLeagueBadge(leagueBadge)}>Explore </StyledButton>
                </Link>
            </CardActions>
        </Card>
    );
};


export default League;