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
import homePageData from "@/lib/home.page";
import { Component } from "@/lib/models/HomePageModel";
import styles from "./home.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CasinoIcon from '@mui/icons-material/Casino'; 

const HomePageComponent = () => {
  const handleListItemClick = (item: string) => {
    router.push(item);
  }

  return (

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
        onClick={() => handleListItemClick('coin')}
      >
        <ListItemAvatar>
          <AccountCircleIcon fontSize="large" />
        </ListItemAvatar>
        <ListItemText
          primary="Coin Probability"
          secondary={
            <React.Fragment>
              {"Interactively explore the probability of getting heads when flipping coin"}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default HomePageComponent;