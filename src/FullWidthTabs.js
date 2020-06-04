import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Toolbar from '@material-ui/core/Toolbar';

const useStylesAppBar = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
    
  const useStylesTable = makeStyles({
    table: {
      minWidth: 700,
    },
  });

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const [planets, setPlanets] = React.useState(props.planets);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const tableClasses = useStylesTable();
  React.useEffect(() => {
      setPlanets(props.planets)
  }, [props.planets])
  const appBarClasses = useStylesAppBar();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleFavourite = (e) => {
      let id = e.currentTarget.id;
      let newPlanetData = planets.map(planet => {
          if(planet.id === id) {
              console.log(planet.isFavourite);
              planet.isFavourite = !planet.isFavourite;
              console.log(planet.isFavourite);
          }
          return {
            ...planet
          }
      })

      setPlanets(newPlanetData)

  }

  return (
    <div className={classes.root}>
      <div className={appBarClasses.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" align="center" className={appBarClasses.title}>
            PLANETSZY
          </Typography>
        </Toolbar>
      </AppBar>
    </div>

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="All Planets" {...a11yProps(0)} />
          <Tab label="Favorite Planets" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
            <TableContainer component={Paper}>
                <Table className={tableClasses.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">PLANET NAME</StyledTableCell>
                            <StyledTableCell align="center">MARK AS FAVORITE</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {planets.map((planet) => (
                            <StyledTableRow key={planet.id}>
                            <StyledTableCell component="th" scope="row" align="center" style={{fontSize: 20}}>
                                {planet.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                <IconButton color="primary" 
                                            id={planet.id}
                                            onClick={(e) => handleFavourite(e)}
                                >
                                    {planet.isFavourite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                                    
                                </IconButton>
                            </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
            <TableContainer component={Paper}>
                    <Table className={tableClasses.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">PLANET NAME</StyledTableCell>
                                <StyledTableCell align="center">PLANET INFO</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {planets.map((planet) => (
                                planet.isFavourite ? (
                                <StyledTableRow key={planet.id}>
                                <StyledTableCell component="th" scope="row" align="center" style={{fontSize: 20}}>
                                    {planet.name}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    <a href={planet.wiki} target="_blank"><img align="center" width="250px" height="200px" src={planet.image} /> </a>
                                </StyledTableCell>
                                </StyledTableRow> ) : ""
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
