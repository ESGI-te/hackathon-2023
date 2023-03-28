import Formation from "./pages/Formation";
import Formations from "./pages/Formations";
import Lesson from "./pages/Lesson";
import Home from "./pages/Home";

const routes = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/formations",
		element: <Formations />,
	},
	{
		path: "/formations/:id",
		element: <Formation />,
	},
	{
		path: "/formations/:id/lessons/:id",
		element: <Lesson />,
	},
];

export default routes;
