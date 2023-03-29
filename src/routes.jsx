import Formation from "./pages/Formation";
import Formations from "./pages/Formations";
import LessonWizard from "./pages/LessonWizard";
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
		path: "/formations/:formationId/lessons/:lessonId",
		element: <LessonWizard />,
	},
];

export default routes;
