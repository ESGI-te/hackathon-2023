import * as yup from "yup";

const schema = yup.object().shape({
	title: yup.string().required(),
	question: yup.string().required(),
	hasMultipleChoices: yup.bool().required(),
	choices: yup.array().of(yup.string()).min(2).required(),
	answer: yup
		.string()
		.test(
			"is-valid-answer",
			"La réponse doit être l'une des choix",
			function (value) {
				const { choices } = this.parent;
				return choices.includes(value);
			}
		)
		.required(),
});

export default schema;
