import React from "react";
import "./Sidebar.css"
import SidebarRow from "./SidebarRow";
import {Box, List, ListItem, ListItemButton, ListItemIcon, Switch} from "@mui/material";
import {AccountBox, Article, Group, ModeNight, Person, Settings, Storefront} from "@mui/icons-material";
import { useStore } from "../../../../store";

export default function Sidebar({mode,setMode,isShowTittle}) {
    console.log(isShowTittle);
    const [state, dispatch] = useStore()
    return (
      <div className="sidebar">
           <Box flex={1} p={2} sx={{display: {xs: "none", sm: "block"}}}>
            <Box position="fixed">

                <List>
                    <ListItem disablePadding>
                        <ListItemButton component='a' href="#">
                            <SidebarRow isShowTittle={isShowTittle} 
                            src={state.account.avatar_account} 
                            title={state.account.user_fname + ' ' + state.account.user_lname} 
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
                            href={`account/personal/${state.slug_pesonal}/setting`}
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