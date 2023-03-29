import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	row-gap: 2rem;
`;

const QuestionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 1.5rem;
`;
const QuestionFieldset = styled.fieldset`
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
`;

const QuestionChoicesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
`;

const QuestionChoiceWrapper = styled.div`
	display: flex;
	align-items: center;
	column-gap: 0.5rem;
`;

const QuestionTitle = styled.h3`
	padding-bottom: 0.5rem;
	border-bottom: solid 1px lightgray;
`;

const SubmitButton = styled(Button)`
	width: 100%;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		width: fit-content;
		align-self: center;
	}
`;

const Question = ({ question, handleChangeAnswer }) => {
	const [selectedValue, setSelectedValue] = useState();

	const handleChange = (value) => {
		setSelectedValue(value);
		handleChangeAnswer(question.id, value);
	};

	return (
		<QuestionWrapper>
			<QuestionTitle>{question.title}</QuestionTitle>
			<QuestionFieldset>
				<p>{question.question}</p>
				<QuestionChoicesWrapper>
					{question.choices.map((choice, i) => (
						<QuestionChoiceWrapper key={i}>
							<input
								onChange={() => handleChange(choice)}
								checked={selectedValue === choice}
								name={question.id}
								type="radio"
								id={choice}
							/>
							<label htmlFor={choice}>{choice}</label>
						</QuestionChoiceWrapper>
					))}
				</QuestionChoicesWrapper>
			</QuestionFieldset>
		</QuestionWrapper>
	);
};

const Quizz = ({ quizz }) => {
	const defaultAnswers = quizz.questions.reduce((acc, question) => {
		acc[question.id] = {
			value: "",
			isValid: null,
		};
		return acc;
	}, {});
	const [answers, setAnswers] = useState(defaultAnswers);

	const handleChangeAnswer = (questionId, value) => {
		setAnswers((prevState) => ({
			...prevState,
			[questionId]: { ...prevState[questionId], value },
		}));
	};

	const checkAnswersValidity = () => {
		Object.entries(answers).forEach(([questionId, answer]) => {
			const question = quizz.questions.find((q) => q.id === questionId);
			setAnswers((prevState) => ({
				...prevState,
				[questionId]: {
					...prevState[questionId],
					isValid: answer.value === question.answer,
				},
			}));
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		checkAnswersValidity();
	};

	return (
		<Form onSubmit={onSubmit}>
			<h2>{quizz.title}</h2>
			{quizz.questions.map((question) => (
				<Question
					question={question}
					key={question.id}
					handleChangeAnswer={handleChangeAnswer}
				/>
			))}
			<SubmitButton variant="contained" type="submit">
				Valider
			</SubmitButton>
		</Form>
	);
};

export default Quizz;
