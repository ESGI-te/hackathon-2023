import { Box, Button, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorWrapper = styled.div`
	width: 100%;
`;

const CKEditorWrapper = styled(CKEditor)`
	.ck-editor__editable_inline {
		min-height: 500px;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	row-gap: 1rem;
`;

const FormationCreateLessonForm = ({ lesson }) => {
	const { handleSubmit, register, errors, control } = useForm();
	const [text, setText] = useState("");

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
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
						autoFocus
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
				render={({}) => (
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
							{...register("video")}
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
	);
};

export default FormationCreateLessonForm;
