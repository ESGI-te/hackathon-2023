import {
  Box,
  Button,
  Fab,
  Typography,
  buttonClasses,
  fabClasses,
  typographyClasses,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useAddLesson from "./useAddLesson.hook";
import { useNavigate } from "react-router-dom";

const EditorWrapper = styled.div`
  margin: 1em;
`;

const CKEditorWrapper = styled(CKEditor)`
  .ck-editor__editable_inline {
    min-height: 500px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  width: 50%;

  .${typographyClasses.h4} {
    font-weight: bold;
    color: var(--blue-700);
  }

  .${buttonClasses.contained} {
    background-color: var(--blue700);
  }

  .${fabClasses.root} {
    background-color: var(--blue700);
    color: white;
  }
`;

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: auto;
  background-color: #fff;
  border-radius: 1em;
`;
const CreateLesson = () => {
  const { handleSubmit, register, errors } = useForm();
  const { control } = useForm();
  const [text, setText] = useState("");
  const { mutate: submitLesson, isSuccess, isError } = useAddLesson();


    const onSubmit = (data) => {

    const file = data.video[0];

      const realData = {
        Title: data.title,
        Description: data.description,
        Duration: data.duration,
        Content: text,
        Intro: data.intro,
          Video: file,
      };
  
      submitLesson(realData);
  
      if (isSuccess) {
        //navigate("/formation");
      }
  
    // if (isError) {
    //   handleError();
    // }
    };



  return (
    <StyledPage>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
          }}
        >
          Créer une leçon
        </Typography>

        <Controller
          control={control}
          name="test"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <TextField
              name="name"
              fullWidth
              size="small"
              label="Titre de la leçon"
              sx={{
                mt: 2,
              }}
              {...register("title", { required: true })}
            />
          )}
        />

<Controller
          control={control}
          name="test"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <TextField
              name="name"
              fullWidth
              size="small"
              label="Durée en minutes"
              type="number"
              sx={{
                mt: 2,
              }}
              {...register("duration", { required: true })}
            />
          )}
        />
        <Controller
          control={control}
          name="test"
          render={({
          }) => (
            <TextField
              fullWidth
              multiline
              minRows={3}
              size="small"
              label="Description du cours"
              sx={{
                mt: 2,
              }}
              {...register("description", { required: true })}
            />
          )}
        />
         <Controller
          control={control}
          name="intro"
          render={({
          }) => (
            <TextField
              fullWidth
              multiline
              minRows={3}
              size="small"
              label="Intro de la lesson"
              sx={{
                mt: 2,
              }}
              {...register("intro", { required: true })}
            />
          )}
        />
        <Typography
          variant="substitle1"
          sx={{
            mb: 2,
            mt: 1,
          }}
        >
          Ajouter une vidéo (optionnel){" "}
        </Typography>
        <label htmlFor="video">
          <Controller
            control={control}
            name="video"
            render={({}) => (
              <input
                style={{ display: "none" }}
                id="video"
                name="video"
                type="file"
                {
                    ...register("video")
                }
              />
            )}
          />

          <Fab color="primary" size="small" component="span" aria-label="add">
            <AddIcon />
          </Fab>
        </label>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        ></Box>
        <EditorWrapper>
          <CKEditorWrapper
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
        </EditorWrapper>
        {errors?.title && <span>This field is required</span>}
        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 2,
          }}
        >
          Créer
        </Button>
      </StyledForm>
    </StyledPage>
  );
};

export default CreateLesson;
