import FormationPage from "@pages/FormationPage";
import FormationsPage from "@pages/FormationsPage";
import LessonPage from "@pages/LessonPage";
import HomePage from "@pages/HomePage";
import FormationCreatePage from "@/pages/FormationCreatePage";
//todo add role check
import FormationsForFormator from "./pages/Formation/Formations";
import CreateLesson from "./pages/Formation/CreateLesson";
import Formation from './components/Formation';


const routes = [
	{
		path: "",
		element: <HomePage />,
	},
	{

		path: "/formation",
		element: <Formation />,
	},
	{
		path: "/formations/:id",
		element: <FormationPage />,
	},
	{

		path: "/formations",
		element: <FormationsPage />,
	},
	{
		path: "/formations/:formationId/lessons/:lessonId",
		element: <LessonPage />,
	},
	{
		path: "/formations/create",
		element: <FormationCreatePage />,
	},
	// TODO replace with good routes
	{
		path: "/personnes",
		element:  <LessonPage />
	},
	{
		path: "/flux",
		element:  <FormationsForFormator />
	},
	{
		path: "/logout",
		element:  <LessonPage />
	},
	{
		path: "/tasks",
		element:  <CreateLesson />
	},

];

export default routes;
