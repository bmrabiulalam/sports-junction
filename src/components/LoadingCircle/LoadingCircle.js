import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
// import Backdrop from '@material-ui/core/Backdrop';
// import { makeStyles } from '@material-ui/core/styles';

export default function LoadingCircle() {

  return <CircularProgress  style={{ color: '#fff', marginBlock: '8%'}}/>

}

// const useStyles = makeStyles((theme) => ({
//   parent: {
//     position: "relative",
//     zIndex: 0,
//     marginBlock: '8%',
//   },

//   backdrop: {
//     position: "absolute"
//   },
// }));

// export default function LoadingCircle() {
//   const classes = useStyles();

//   return (
//     <div className={classes.parent}>
//       <Backdrop className={classes.backdrop} open={true}>
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </div>
//   );
// }