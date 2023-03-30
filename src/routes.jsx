import FormationPage from "@pages/FormationPage";
import FormationsPage from "@pages/FormationsPage";
import LessonPage from "@pages/LessonPage";
import HomePage from "@pages/HomePage";

const routes = [
	{
		path: "",
		element: <HomePage />,
	},
	{
		path: "/formations",
		element: <FormationsPage />,
	},
	{
		path: "/formations/:id",
		element: <FormationPage />,
	},
	{
		path: "/formations/:formationId/lessons/:lessonId",
		element: <LessonPage />,
	},
];

export default routes;
