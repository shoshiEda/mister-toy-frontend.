import * as React from 'react';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { NavLink, useNavigate } from 'react-router-dom'


export function OpenMenuSideBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      <nav className="app-nav">
      <ListItem><ListItemButton> <NavLink to="/" >Home</NavLink></ListItemButton></ListItem>
      <ListItem><ListItemButton> <NavLink to="/about" >About</NavLink></ListItemButton></ListItem>
      <ListItem><ListItemButton> <NavLink to="/toy" >Toys</NavLink></ListItemButton></ListItem>
      <ListItem><ListItemButton> <NavLink to="/dashboard" >Dashboard</NavLink></ListItemButton></ListItem>
                </nav>
      </List>
    </Box>
  );
    const anchor='right'
  return (
    <React.Fragment>
      <ButtonGroup variant="outlined">
       
          {<Button className=" icon" key={anchor} onClick={toggleDrawer(anchor, true)}>
          <i style={{color:'whitesmoke'}} className=" fa-solid fa-bars"></i>
  </Button>}
        
      </ButtonGroup>
        <Drawer
          key={anchor}
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
        >
          {list(anchor)}
        </Drawer>
   
    </React.Fragment>
  );
}