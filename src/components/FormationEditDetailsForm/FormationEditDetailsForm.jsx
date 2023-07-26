import { useEffect } from "react";
import {
  FORMATION_DIFFICULTIES,
  FORMATION_DIFFICULTIES_NAMES,
} from "@/utils/constants";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import schema from "./FormationCreateForm.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import useEditFormation from "./useEditFormation.hook";
import { useParams } from "react-router-dom";

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

const ImagePreview = styled.img`
  width: 100%;
  max-width: 400px;
  max-height: 400px;
`;

const UploadButton = styled(Button)`
  width: fit-content;
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
`;

const FormationCreateForm = ({ formation }) => {
  const { control, handleSubmit, formState, getValues } = useForm({
    values: {
      title: formation.title || "",
      description: formation.description || "",
      difficulty: formation.difficulty || FORMATION_DIFFICULTIES.NORMAL,
      cover_url: "",
    },
    resolver: yupResolver(schema),
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
  };

  const {formationId} = useParams()

  const { mutate: submitEditFormation } = useEditFormation(formationId);

  const onSubmit = (formData) => {
    console.log(formData);

    submitEditFormation({
      ...formData,
      cover_url: imagePreview,
      id: formation.id,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        rules={{ required: true }}
        control={control}
        name=""
        render={({ field: { onChange, value } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label="Titre de la formation"
            autoFocus
          />
        )}
      />
      <Controller
        rules={{ required: true }}
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextareaAutosize
            aria-label="Description"
            placeholder="Description de la formation"
            onChange={onChange}
            value={value}
            minRows={6}
          />
        )}
      />
      <Controller
        rules={{ required: true }}
        control={control}
        name="difficulty"
        render={({ field: { onChange, value } }) => (
          <Select
            labelId="create-formation-select-label"
            id="create-formation-select"
            label="Difficulté"
            onChange={onChange}
            value={value}
          >
            {Object.values(FORMATION_DIFFICULTIES).map((difficulty, i) => (
              <MenuItem key={i} value={difficulty}>
                {FORMATION_DIFFICULTIES_NAMES[difficulty]}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <Controller
        rules={{ required: true }}
        control={control}
        name="cover_url"
        render={({ field: { onChange, value } }) => (
          <UploadButton variant="contained" component="label" color="primary">
            <AddIcon /> Ajouter une image
            <input
              onChange={handleImageChange}
              value={value}
              type="file"
              hidden
            />
          </UploadButton>
        )}
      />
      {imagePreview && (
        <ImagePreview
          src={imagePreview || formation.cover_url}
          alt="Image Preview"
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

export default FormationCreateForm;
