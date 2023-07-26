import {
	Box,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Modal,
	Stack,
	TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import schema from "./FormationEditQuizzForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormationEditQuizzQuestionForm from "../FormationEditQuizzQuestionForm/FormationEditQuizzQuestionForm";
import DeleteIcon from "@mui/icons-material/Delete";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
	max-width: 600px;
`;

const SubmitButton = styled(Button)`
	width: 100%;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		width: fit-content;
		align-self: center;
	}
`;

const QuestionsList = ({ questions, handleDeleteQuestion }) => {
	return (
		<List>
			{questions.map((question, i) => (
				<ListItem
					secondaryAction={
						<IconButton
							onClick={() => handleDeleteQuestion(question)}
							edge="end"
							aria-label="delete"
							color="error"
						>
							<DeleteIcon />
						</IconButton>
					}
					key={i}
				>
					<ListItemText
						primary={question.title}
						secondary={
							<Stack gap="0.125rem">
								{question.question}
								<span>{question.choices.length} réponses</span>
							</Stack>
						}
					/>
				</ListItem>
			))}
		</List>
	);
};

const FormationEditQuizzForm = () => {
	const { control, handleSubmit, formState, setValue, watch, trigger } =
		useForm({
			defaultValues: {
				title: "",
				questions: [],
			},
			resolver: yupResolver(schema),
		});
	const [questionFormModalIsOpen, setQuestionFormModalIsOpen] = useState(false);
	const questions = watch("questions");

	useEffect(() => {
		trigger("questions");
	}, [questions]);

	const handleAddQuestion = (question) => {
		if (!question) return;
		const newQuestions = [...questions, question];
		setValue("questions", newQuestions);
		setQuestionFormModalIsOpen(false);
	};

	const handleDeleteQuestion = (value) => {
		if (!value) return;
		const newQuestions = questions.filter((question) => question !== value);
		setValue("questions", newQuestions);
	};

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					rules={{ required: true }}
					control={control}
					name="title"
					render={({ field: { onChange, value } }) => (
						<TextField
							onChange={onChange}
							value={value}
							label="Titre du quizz"
							autoFocus
						/>
					)}
				/>
				<Button
					onClick={() => setQuestionFormModalIsOpen(true)}
					startIcon={<AddIcon />}
				>
					Ajouter une question
				</Button>
				{questions.length > 0 && (
					<QuestionsList
						handleDeleteQuestion={handleDeleteQuestion}
						questions={questions}
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
			<Modal
				open={questionFormModalIsOpen}
				onClose={() => setQuestionFormModalIsOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						maxWidth: 600,
						width: "100%",
						bgcolor: "var(--neutral100)",
						border: "1px solid var(--neutral300)",
						boxShadow: "0px 16px 32px rgba(23, 43, 77, 0.16)",
						p: 4,
						borderRadius: "0.5rem",
					}}
				>
					<FormationEditQuizzQuestionForm
						handleAddQuestion={handleAddQuestion}
					/>
				</Box>
			</Modal>
		</>
	);
};

export default FormationEditQuizzForm;
