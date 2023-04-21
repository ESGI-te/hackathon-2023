import {
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import schema from "./FormationEditQuizzQuestionForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
`;

const SubmitButton = styled(Button)`
	width: 100%;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		width: fit-content;
		align-self: center;
	}
`;

const ChoicesList = ({
	choices,
	handleDeleteChoice,
	handleSelectAnswer,
	answer,
}) => {
	return (
		<List>
			{choices.map((choice, i) => (
				<ListItem
					secondaryAction={
						<IconButton
							onClick={() => handleDeleteChoice(choice)}
							edge="end"
							aria-label="delete"
							color="error"
						>
							<DeleteIcon />
						</IconButton>
					}
					key={i}
				>
					<ListItemButton onClick={() => handleSelectAnswer(choice)}>
						{choice === answer && (
							<ListItemIcon>
								<CheckCircleIcon color="success" />
							</ListItemIcon>
						)}
						<ListItemText
							primary={choice}
							secondary={
								choice === answer ? "Vous avez choisi cette réponse" : null
							}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
};

const Choice = ({ handleAddChoice }) => {
	const [choice, setChoice] = useState("");
	const onAddChoice = () => {
		handleAddChoice(choice);
		setChoice("");
	};
	return (
		<>
			<TextField
				onChange={(e) => setChoice(e.target.value)}
				value={choice}
				label="Ajouter une réponse"
			/>
			<Button onClick={onAddChoice} startIcon={<AddIcon />}>
				Ajouter
			</Button>
		</>
	);
};

const FormationEditQuizzQuestionForm = ({ handleAddQuestion }) => {
	const { control, handleSubmit, formState, setValue, watch, trigger } =
		useForm({
			defaultValues: {
				title: "",
				question: "",
				hasMultipleChoices: false,
				choices: [],
				answer: "",
			},
			resolver: yupResolver(schema),
		});

	const choices = watch("choices");
	const hasMultipleChoices = watch("hasMultipleChoices");
	const answer = watch("answer");

	useEffect(() => {
		trigger("hasMultipleChoices");
	}, [hasMultipleChoices]);

	const handleAddChoice = (value) => {
		if (!value || choices.includes(value)) return;
		const newChoices = [...choices, value];
		setValue("choices", newChoices);
	};

	const handleDeleteChoice = (value) => {
		if (!value) return;
		const newChoices = choices.filter((choice) => choice !== value);
		setValue("choices", newChoices);
	};

	const handleSelectAnswer = (value) => {
		if (!value || value === answer) return;
		setValue("answer", value);
	};

	const onSubmit = (formData) => {
		handleAddQuestion(formData);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				rules={{ required: true }}
				control={control}
				name="title"
				render={({ field: { onChange, value } }) => (
					<TextField
						onChange={onChange}
						value={value}
						label="Titre de la question"
						autoFocus
					/>
				)}
			/>
			<Controller
				rules={{ required: true }}
				control={control}
				name="question"
				render={({ field: { onChange, value } }) => (
					<TextField onChange={onChange} value={value} label="Question" />
				)}
			/>
			<Controller
				name="hasMultipleChoices"
				control={control}
				render={({ field }) => (
					<FormControlLabel
						control={
							<Checkbox
								{...field}
								checked={field.value}
								onChange={(e) => field.onChange(e.target.checked)}
							/>
						}
						label="Réponses multiples"
					/>
				)}
			/>

			<Choice handleAddChoice={handleAddChoice} />
			{choices.length > 0 && (
				<ChoicesList
					answer={answer}
					handleSelectAnswer={handleSelectAnswer}
					handleDeleteChoice={handleDeleteChoice}
					choices={choices}
				/>
			)}
			<SubmitButton
				disabled={!formState.isValid}
				variant="contained"
				type="submit"
			>
				Valider
			</SubmitButton>
		</Form>
	);
};

export default FormationEditQuizzQuestionForm;
