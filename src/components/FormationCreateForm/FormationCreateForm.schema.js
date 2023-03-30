import { FORMATION_DIFFICULTIES } from "@/utils/constants";
import * as yup from "yup";

const schema = yup.object({
	title: yup.string().required(),
	description: yup.string().max(400).required(),
	difficulty: yup
		.string()
		.oneOf(Object.values(FORMATION_DIFFICULTIES))
		.required(),
});

export default schema;
