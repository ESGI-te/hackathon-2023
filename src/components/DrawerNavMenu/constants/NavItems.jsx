import MenuBookIcon from '@mui/icons-material/MenuBook';

import FluxIcon from "../icons/Flux"
import Logout from "../icons/Logout"
import PersonneIcon from "../icons/Personnes"
import TaskIcon from "../icons/Task"


export const navItems = 
   [ {
        path: "/tasks",
        label: "Tasks",
        icon: <TaskIcon />
    },
    {
        path: "/formation",
        label: "Personnes",
        icon: <PersonneIcon/>
    },
    {
        path: "/formations",
        label: "Formation",
        icon: <MenuBookIcon />,
    },

    {
        path: "/flux",
        label: "Flux",
        icon: <FluxIcon/>
    },
    {
        path: "/logout",
        label: "Se déconnecter",
        icon: <Logout />
    }
]


