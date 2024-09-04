import React from 'react'
import './Sidebar.css'
import SidebarRow from './SidebarRow'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Switch,
} from '@mui/material'
import { AccountBox, ModeNight, Person, Settings } from '@mui/icons-material'
import { useStore } from '@store'
import PropTypes from 'prop-types'
/* eslint-disable no-unused-vars */
export default function Sidebar({ mode, setMode, isShowTittle }) {
  const [state, dispatch] = useStore()
  return (
    <div className="sidebar">
      <Box flex={1} p={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Box position="fixed">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <SidebarRow
                  isShowTittle={isShowTittle}
                  src={state.account.avatar_account}
                  title={state.account.fname + ' ' + state.account.lname}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <SidebarRow
                  isShowTittle={isShowTittle}
                  href={'friends'}
                  Icon={Person}
                  title="Friends"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <SidebarRow
                  isShowTittle={isShowTittle}
                  Icon={Settings}
                  title="Settings"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <SidebarRow
                  isShowTittle={isShowTittle}
                  Icon={AccountBox}
                  title="Profile"
                  href={`account/personal/${state.slug_pesonal}/setting`}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a" href="#">
                <ListItemIcon>
                  <ModeNight />
                </ListItemIcon>
                <Switch
                  onChange={(e) => setMode(mode === 'light' ? 'dark' : 'light')}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    </div>
  )
}

Sidebar.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  isShowTittle: PropTypes.bool.isRequired,
}
/* eslint-disable no-unused-vars */
