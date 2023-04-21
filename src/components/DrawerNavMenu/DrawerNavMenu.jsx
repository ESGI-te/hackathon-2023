import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
  } from "@mui/material";
  import InboxIcon from "@mui/icons-material/MoveToInbox";
  import MailIcon from "@mui/icons-material/Mail";
import logo from "./../../../public/images/simple-logo.png";
import { navItems } from "./constants/NavItems";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: white;
  align-items: center;
  img {
    width: 60%;
  }

  font-weight: bold ;

  .MuiTypography-root {
	font-weight: 500;
  }

`;

const DrawerNavMenu = () => {

	const navigate = useNavigate();


	const handleRedirect = (path) => {
		navigate(path)
	}

  return (
    <Nav>
      <img src={logo} alt="" />
      <List>
        {navItems.map(({ label, icon, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
				  alignItems: "center",
				  justifyContent: "center",
				  width: "100%"
                }}
              >
                <ListItemIcon
				sx={{
					justifyContent: "center",
				}}
				onClick={() => handleRedirect(path)}
				>{icon}</ListItemIcon>
				<ListItemText primary={label} />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Nav>
  );
};

export default DrawerNavMenu;
