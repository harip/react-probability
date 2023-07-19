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
import { conicOptions, probabilityOptions } from "./home.data";

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
        
        <Divider orientation="vertical" flexItem style={{ backgroundColor: '#ccc', borderRadius: '3px', width: '2px', marginLeft: '15px' , boxShadow: '-1px 0 1px rgba(0, 0, 0, 0.2)' }} />

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