import FormationPage from "@pages/FormationPage";
import FormationsPage from "@pages/FormationsPage";
import LessonPage from "@pages/LessonPage";
import HomePage from "@pages/HomePage";
import FormationCreatePage from "@/pages/FormationCreatePage";

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
	{
		path: "/formations/create",
		element: <FormationCreatePage />,
	},
];

export default routes;
