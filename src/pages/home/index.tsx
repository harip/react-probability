import React from "react";
import router from "next/router";
import {
  Divider,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CasinoIcon from '@mui/icons-material/Casino';
import HomeIcon from '@mui/icons-material/Home';
import {
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill
} from 'react-icons/bs';
import {
  PiBezierCurveThin
} from 'react-icons/pi';

const probabilityOptions = [
  {
    id: 'deck',
    primary: 'Deck Probability',
    secondary: 'Interactively explore the probability of drawing cards from a deck',
    icon: (
      <>
        <div>
          <BsFillSuitSpadeFill />
          <BsFillSuitClubFill />
        </div>
        <BsFillSuitHeartFill />
        <BsFillSuitDiamondFill />
      </>
    ),
  },
  {
    id: 'coin',
    primary: 'Coin Probability',
    secondary: 'Interactively explore the probability of getting heads when flipping a coin',
    icon: <AccountCircleIcon fontSize="large" />,
  },
  {
    id: 'dice',
    primary: 'Dice Probability',
    secondary: 'Interactively explore the probability of rolling dice and attaining a specific value',
    icon: <CasinoIcon fontSize="large" />,
  },
];

const conicOptions = [
  {
    id: 'parabola',
    primary: 'Parabola',
    secondary: 'A symmetrical open plane curve formed by the intersection of a cone with a plane parallel to its side',
    icon: <PiBezierCurveThin fontSize="large" />,
  },
];

const HomePageComponent = () => {
  const handleListItemClick = (item: any) => {
    router.push(item.id);
  }
  const handleHomeClick = () => {
    router.push('https://harip.github.io/site/#/projects');
  }

  return (

    <div  >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ backgroundColor: 'var(--background-paper)', position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' }}>
            <List style={{ padding: '16px', height: '100%' }}>
              {probabilityOptions.map((option) => (
                <React.Fragment key={option.id}>
                  <ListItemButton alignItems="flex-start" onClick={() => handleListItemClick(option)}>
                    <ListItemAvatar>{option.icon}</ListItemAvatar>
                    <ListItemText primary={option.primary} secondary={option.secondary} />
                  </ListItemButton>
                  <Divider variant="inset" component="li" style={{ borderColor: '#eee' }} />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Divider orientation="vertical" flexItem style={{ backgroundColor: '#ccc', borderRadius: '3px', width: '2px', marginLeft: '15px', boxShadow: '-1px 0 1px rgba(0, 0, 0, 0.2)' }} />

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ backgroundColor: 'var(--background-paper)', position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' }}>
            <List style={{ padding: '16px', height: '100%' }}>
              {conicOptions.map((option) => (
                <React.Fragment key={option.id}>
                  <ListItemButton alignItems="flex-start" onClick={() => handleListItemClick(option)}>
                    <ListItemAvatar>{option.icon}</ListItemAvatar>
                    <ListItemText primary={option.primary} secondary={option.secondary} />
                  </ListItemButton>
                  <Divider variant="inset" component="li" style={{ borderColor: '#eee' }} />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
};

export default HomePageComponent;