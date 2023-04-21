import {
	Alert,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import useQuizzSchema from "./useQuizzSchema.hook";
import useSubmitQuizz from "./useSubmitQuizz.hook";
import { yupResolver } from "@hookform/resolvers/yup";
import quizzSuccessImg from "@public/images/quizz_success.svg";
import quizzFailImg from "@public/images/quizz_fail.svg";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
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

const QuizzCompletedImg = styled.img`
  max-width: 240px;
  max-height: 240px;
  width: 100%;
`;

const QuizzCompletedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
  text-align: center;
`;

const LessonLink = styled(Link)`
  color: var(--neutral800);
  &:hover {
    text-decoration: underline;
  }
`;

const Question = ({ question, control }) => (
  <QuestionWrapper>
    <QuestionTitle>{question.title}</QuestionTitle>
    <QuestionFieldset>
      <p>{question.question}</p>
      <Controller
        rules={{ required: true }}
        control={control}
        name={question.id}
        render={({ field }) => (
          <RadioGroup {...field}>
            {question.choices.map((choice, i) => (
              <FormControlLabel
                key={i}
                value={choice}
                control={<Radio />}
                label={choice}
              />
            ))}
          </RadioGroup>
        )}
      />
    </QuestionFieldset>
  </QuestionWrapper>
);

const QuizzForm = ({ quizz }) => {
  const defaultValues = quizz.current.questions.reduce((acc, question) => {
    acc[question.id] = "";
    return acc;
  }, {});
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const handleError = () => {
    setOpenError(true);
  };

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const { formationId, lessonId } = useParams();
  const schema = useQuizzSchema(quizz.current.questions);
  const { control, handleSubmit, formState } = useForm({
    defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
  });

  const { mutate: submitQuizz, isSuccess, isError } = useSubmitQuizz(lessonId);

  const onSubmit = (formData) => {
    const data = {
      quizzId: quizz.current.id,
      answers: formData,
      formation: formationId,
    };

    submitQuizz(data);

    if (isSuccess) {
		handleSuccess();
    }

	if (isError) {
		handleError();
	}
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
	  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Vous avez réussi le Quizz !
        </Alert>
      </Snackbar>
	  <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Dommage veuillez réessayer !
        </Alert>
      </Snackbar>
      <Typography variant="h5">{quizz.current.title}</Typography>
      {quizz.current.questions.map((question) => (
        <Question control={control} question={question} key={question.id} />
      ))}
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

const QuizzCompleted = ({ quizz }) => {
  const { formationId } = useParams();
  const hasSucceed = quizz.current.isValid;
  const img = hasSucceed ? quizzSuccessImg : quizzFailImg;
  const nextLessonLink = `/formations/${formationId}/lessons/${quizz?.next.id}`;

  return (
    <QuizzCompletedWrapper>
      <QuizzCompletedImg src={img} />
      {hasSucceed ? (
        <Typography>
          Félicitations, vous avez réussi le quizz avec succès 😎 ! <br />
          Vous pouvez passer à la prochaine leçon ou revoir ce quizz plus tard
          si vous le souhaitez.
        </Typography>
      ) : (
        <Typography>
          Dommage, vous n'avez pas réussi ce quizz 🙁 <br />
          <br /> Essayez de revoir les informations de la leçon et réessayez à
          nouveau plus tard. Vous pouvez également demander de l'aide à un
          instructeur ou passer à la{" "}
          <LessonLink to={nextLessonLink}>
            prochaine leçon si vous le souhaitez.
          </LessonLink>
        </Typography>
      )}
      <Button variant={hasSucceed ? "text" : "contained"}>
        {hasSucceed ? "Repasser ce test" : "Rééssayer"}
      </Button>
    </QuizzCompletedWrapper>
  );
};

const Quizz = ({ quizz }) => {
  if (quizz.current.isCompleted) return <QuizzCompleted quizz={quizz} />;

  return <QuizzForm quizz={quizz} />;
};

export default Quizz;
