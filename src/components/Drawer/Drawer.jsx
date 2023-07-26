import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import DrawerNavMenu from "../DrawerNavMenu";

export const DRAWER_WIDTH = 170;

const Menu = ({ handleToggleDrawer, drawerIsOpen }) => {
	const container = window.document.body;
	return (
		<Box
			component="aside"
			sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
			aria-label="mailbox folders"
		>
			<Drawer
				container={container}
				variant="temporary"
				open={drawerIsOpen}
				onClose={handleToggleDrawer}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: "block", md: "none" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: DRAWER_WIDTH,
					},
				}}
			>
				<DrawerNavMenu />
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", md: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: DRAWER_WIDTH,
					},
				}}
				open
			>
				<DrawerNavMenu />
			</Drawer>
		</Box>
	);
};

export default Menu;
