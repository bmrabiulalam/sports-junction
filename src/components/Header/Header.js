import React, {useContext} from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import './Header.css';
import bgImg from '../../images/banner/1050px-Camp_Nou_Panoramic_Interior_View.jpg';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { HeaderLeagueBadgeContext } from '../../App';

const StyledCardMedia = withStyles({
    /* Styles applied to the root element. */
    root: {
        backgroundSize: 'contain',
    },
    /* Styles applied to the root element if `component="picture or img"`. */
    img: {
        // ⚠️ object-fit is not supported by IE 11.
        objectFit: 'contain',
    },
})(CardMedia);

const useStyles = makeStyles({
    media: {
      height: 350,
    },
  });

const Header = (props) => {
    const classes = useStyles();
    const defaultInnerItem = 'SPORTS JUNCTION';
    const [headerLeagueBadge] = useContext(HeaderLeagueBadgeContext);
    
    return (
        <Card style={{marginTop: '-10px', color: '#eff'}}>
            <CardActionArea style={{position: 'relative'}}>
                <CardMedia  className={classes.media}
                    image={bgImg}
                    title=""
                />
                <CardContent className='overlay'>
                    {
                        headerLeagueBadge 
                        ? <StyledCardMedia
                                component="img"
                                height="150"
                                image={headerLeagueBadge}
                            /> 
                        : <h1>{defaultInnerItem}</h1>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default Header;