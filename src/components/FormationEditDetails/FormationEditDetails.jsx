import { Typography, Container, Stack, Button, Modal } from "@mui/material";
import { useState } from "react";
import formation from "./formationsData1.json";
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";
import FormationEditDetailsForm from "../FormationEditDetailsForm";

const DetailsContainer = styled(Container)`
  display: flex !important;
  flex-direction: column;
  row-gap: 2rem;
`;
const ContentWrapper = styled.div`
  display: flex;
  column-gap: 2rem;
`;
const FormationImg = styled.img`
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  border-radius: 0.5rem;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    justify-content flex-end;
`;

const FormationEditDetails = ({ data, onUpdate }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const handleOpenEditmodal = () => setEditModalIsOpen(true);
  const handleCloseEditModal = () => setEditModalIsOpen(false);

  const handleOpenDeletemodal = () => setDeleteModalIsOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalIsOpen(false);

  return (
    <><DetailsContainer maxWidth="md">
      <ButtonsWrapper>
        <Button variant="contained" color="primary" startIcon={<EditIcon/>} onClick={handleOpenEditmodal}>Modifier</Button>
        <Button variant="contained" color="error" startIcon={<DeleteIcon/>} onClick={handleOpenDeletemodal}>Supprimer</Button>
      </ButtonsWrapper>
      <ContentWrapper>
        <Stack gap="2rem">
          <FormationImg src={formation.cover_url} />
          <Stack gap="1rem">
            <Typography>Durée : {formation.duration}</Typography>
            <Typography>Difficulté : {formation.difficulty}</Typography>
            <Typography>Nombre de lessons : {formation.nbLessons}</Typography>
          </Stack>
        </Stack>
        <Stack gap="2rem">
          <Typography variant="h5">{formation.title}</Typography>
          <Typography>{formation.description}</Typography>
        </Stack>
      </ContentWrapper>
    </DetailsContainer>
    <Modal
				open={editModalIsOpen}
				onClose={handleCloseEditModal}
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
					<FormationEditDetailsForm
						formation={formation}
					/>
				</Box>
			</Modal>
    </>
    
    
  );
};

export default FormationEditDetails;
