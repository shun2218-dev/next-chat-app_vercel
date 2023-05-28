"use client";
import React from 'react'
import {List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar} from "@mui/material"

const UserList = () => {
  return (
    <List sx={{color: "#ffffff"}}>
      <ListItem>
        <ListItemAvatar>
            <Avatar alt='test' />
        </ListItemAvatar>
        <ListItemText>Username</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
            <Avatar alt='test' />
        </ListItemAvatar>
        <ListItemText>Username</ListItemText>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemAvatar>
            <Avatar alt='test' />
        </ListItemAvatar>
        <ListItemText>Username</ListItemText>
      </ListItem>
      <Divider />
    </List>
  )
}

export default UserList
