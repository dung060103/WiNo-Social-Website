import React from "react";
import "./Sidebar.css"
import SidebarRow from "./SidebarRow";
import {Box, List, ListItem, ListItemButton, ListItemIcon, Switch} from "@mui/material";
import {AccountBox, Article, Group, ModeNight, Person, Settings, Storefront} from "@mui/icons-material";

export default function Sidebar({mode,setMode,isShowTittle}) {
    console.log(isShowTittle);

    return (
      <div className="sidebar">
           <Box flex={1} p={2} sx={{display: {xs: "none", sm: "block"}}}>
            <Box position="fixed">

                <List>
                    <ListItem disablePadding>
                        <ListItemButton component='a' href="#">
                            <SidebarRow isShowTittle={isShowTittle} 
                            src={"https://vivureviews.com/wp-content/uploads/2022/02/among-us-profile-picture.jpg"} 
                            title={"Among Us"} 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                            <SidebarRow isShowTittle={isShowTittle} 
                            Icon={Article} 
                            title="Pages" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                        <SidebarRow isShowTittle={isShowTittle} 
                            Icon={Group} 
                            title="Groups" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                        <SidebarRow isShowTittle={isShowTittle} 
                            Icon={Storefront} 
                            title="Marketplace" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                        <SidebarRow isShowTittle={isShowTittle}
                            href={'friends'}
                            Icon={Person} 
                            title="Friends" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                        <SidebarRow isShowTittle={isShowTittle} 
                            Icon={Settings} 
                            title="Settings" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                        <SidebarRow isShowTittle={isShowTittle} 
                            Icon={AccountBox} 
                            title="Profile" 
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component="a" href="#">
                            <ListItemIcon >
                                <ModeNight/>
                            </ListItemIcon>
                            <Switch onChange={(e)=>setMode(mode === 'light'?"dark":"light")}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
      </div>
    );
  }