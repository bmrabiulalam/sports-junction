import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import female from '../../images/gender-photo/female.png';
import male from '../../images/gender-photo/male.png';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import { HeaderLeagueBadgeContext } from '../../App';
import PlaceIcon from '@material-ui/icons/Place';
import FlagIcon from '@material-ui/icons/Flag';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import IconLink from '../IconLink/IconLink';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

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

const LeagueDetails = () => {
    const { idLeague } = useParams();
    const [leagueDetails, setLeagueDetails] = useState({});
    const {
        strLeague,
        strBadge,
        strSport,
        intFormedYear,
        strGender,
        strCountry,
        strFacebook,
        strTwitter,
        strYoutube,
        strDescriptionEN
    } = leagueDetails;

    const [, setHeaderLeagueBadge] = useContext(HeaderLeagueBadgeContext);
    setHeaderLeagueBadge(strBadge);

    useEffect(() => {
        const url = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${idLeague}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setLeagueDetails(data.leagues[0]));
    }, [idLeague]);

    const classes = useStyles();

    return (
        Object.keys(leagueDetails).length > 0 ?  
        <div className={classes.root} style={{color: '#eff', marginInline: '5%', marginTop: '3%'}}> 
            <Grid container spacing={5} style={{alignItems: 'center', borderRadius: '10px', backgroundColor: '#3bb78f', backgroundImage: 'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)'}}>
                <Grid item xs={12} sm={6} style={{alignItems: 'center', justifyContent: 'center'}}>
                    <h2>{strLeague}</h2>
                    <p><PlaceIcon /> Founded: {intFormedYear}</p>
                    <p><FlagIcon /> Country: {strCountry}</p>
                    <p><SportsSoccerIcon /> Sports Type: {strSport}</p>
                    <p>Gender: {strGender}</p>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {
                        <StyledCardMedia
                            component="img"
                            alt={`${strGender} league`}
                            height="200"
                            image={strGender.toLowerCase() === 'male' ? male : female}
                            title={`${strGender} league`}
                        />
                    }
                </Grid>
            </Grid>
            <Grid container style={{marginBlock: '60px'}}>
                <Grid item>
                    <p>{strDescriptionEN}</p>
                </Grid>
            </Grid>
            <Grid container spacing={3} justify="center">
                <Grid item style={{marginBottom: '50px', borderRadius: '10px', backgroundColor: '#3bb78f', backgroundImage: 'linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)'}}>
                    <IconLink strURL={strFacebook}><FacebookIcon style={{ fontSize: '50px' }} /></IconLink>
                    <IconLink strURL={strYoutube}><YouTubeIcon style={{ fontSize: '50px' }} /></IconLink>
                    <IconLink strURL={strTwitter}><TwitterIcon style={{ fontSize: '50px' }} /></IconLink>
                </Grid>
            </Grid>
        </div>
        : <LoadingCircle />
    );
};

export default LeagueDetails;