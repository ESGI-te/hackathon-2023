import { useEffect, useState } from "react";
import * as yup from "yup";

const useQuizzSchema = (questions) => {
	const [schema, setSchema] = useState(null);

	useEffect(() => {
		const schemaObject = questions.reduce((acc, question) => {
			acc[question.id] = yup.string().required("Ce champ est requis");
			return acc;
		}, {});

		setSchema(yup.object().shape(schemaObject));
	}, [questions]);

	return schema;
};

export default useQuizzSchema;
