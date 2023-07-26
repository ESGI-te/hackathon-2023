import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "../Drawer";
import styled from "styled-components";

const InnerWrapper = styled.div`
	padding-left: 1rem;
	display: flex;
	align-items: center;
	column-gap: 1rem;
	min-height: 56px;
`;

const Header = ({ handleToggleDrawer }) => {
	return (
		<AppBar
			position="fixed"
			sx={{
				width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
				ml: { mathDepth: `${DRAWER_WIDTH}px` },
			}}
			style={
				{
					backgroundColor: "#fff",
				}
			}
		>
			<InnerWrapper>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleToggleDrawer}
					sx={{ display: { md: "none" } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Responsive drawer
				</Typography>
			</InnerWrapper>
		</AppBar>
	);
};

export default Header;
