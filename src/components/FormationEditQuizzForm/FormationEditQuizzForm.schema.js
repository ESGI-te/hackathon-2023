import * as yup from "yup";
import questionSchema from "@components/FormationEditQuizzQuestionForm/FormationEditQuizzQuestionForm.schema";

const schema = yup.object().shape({
	title: yup.string().required(),
	questions: yup.array().of(questionSchema).min(2).required(),
});

export default schema;
