import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "../Drawer";

const Header = ({ handleToggleDrawer }) => {
	return (
		<AppBar
			position="fixed"
			sx={{
				width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
				ml: { sm: `${DRAWER_WIDTH}px` },
			}}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleToggleDrawer}
					sx={{ mr: 2, display: { sm: "none" } }}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap component="div">
					Responsive drawer
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;