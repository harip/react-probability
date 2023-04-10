import React from "react";
import router from "next/router";
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography
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
import styles from "./home.module.css";

const HomePageComponent = () => {
  const handleListItemClick = (item: string) => {
    router.push(item);
  }
  const handleHomeClick = () => {
    router.push('https://harip.github.io/site/#/projects');
  }

  return (

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

      <ListItemButton
        alignItems="flex-start"
        onClick={() => handleListItemClick('deck')}
      >
        <ListItemAvatar>
          <div>
            <BsFillSuitSpadeFill/>
            <BsFillSuitClubFill/>
          </div>
          <BsFillSuitHeartFill />
          <BsFillSuitDiamondFill />
        </ListItemAvatar>
        <ListItemText
          primary="Deck Probability"
          secondary={
            <React.Fragment>
              {"Interactively explore the probability of drawing cards from a deck"}
            </React.Fragment>
          }
        />
      </ListItemButton>

      <Divider variant="inset" component="li" />

      <ListItemButton
        alignItems="flex-start"
        onClick={() => handleListItemClick('coin')}
      >
        <ListItemAvatar>
          <AccountCircleIcon fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary="Coin Probability"
          secondary={
            <React.Fragment>
              {"Interactively explore the probability of getting heads when flipping a coin"}
            </React.Fragment>
          }
        />
      </ListItemButton>

      <Divider variant="inset" component="li" />

      <ListItemButton
        alignItems="flex-start"
        onClick={() => handleListItemClick('dice')}
      >
        <ListItemAvatar>
          <CasinoIcon fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary="Dice Probability"
          secondary={
            <React.Fragment>
              {"Interactively explore the probability of rolling dice and attaining a specific value"}
            </React.Fragment>
          }
        />
      </ListItemButton>

      <Divider variant="inset" component="li" />

      <ListItemButton
        alignItems="flex-start"
        onClick={() => handleHomeClick()}
      >
        <ListItemAvatar>
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <HomeIcon fontSize="large" />
            </React.Fragment>
          }
        />
      </ListItemButton>

    </List>
  );
};

export default HomePageComponent;