import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Delete, Edit } from "@mui/icons-material";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import useFetchQuizz from "./useFetchQuizz.hook";
import FormationEditQuizzForm from "../FormationEditQuizzForm/FormationEditQuizzForm";

const PageContainer = styled.div`
	padding-block: 1rem;
	padding-inline: 1rem;
	height: 100%;

	${(p) => p.theme.mediaQueries.desktopAndUp} {
		padding-block: 1.5rem;
		padding-inline: 1.5rem;
	}
`;
function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

export default function FormationEditQuizz() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
	const [currentQuizz, setCurrentQuizz] = useState(false);

	const { data: rows, isLoading, error } = useFetchQuizz();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) return "An error has occurred: " + error.message;

	const handleDeleteFormation = (id) => {
		// delete formation on server
	};

	const handleOpenEditmodal = (lesson) => {
		setEditModalIsOpen(true);
		setCurrentQuizz(lesson);
	};
	const handleCloseEditModal = () => setEditModalIsOpen(false);

	const handleOpenDeletemodal = (lesson) => {
		setDeleteModalIsOpen(true);
		setCurrentQuizz(lesson);
	};

	const handleCloseDeleteModal = () => setDeleteModalIsOpen(false);

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<PageContainer>
			<Typography
				variant="h4"
				component="h1"
				sx={{ fontWeight: 700, marginBottom: "1rem" }}
			>
				Mes leçons
			</Typography>
			<TableContainer component={Paper}>
				<Table aria-label="custom pagination table">
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row.title}
								</TableCell>
								<TableCell style={{ width: 160 }} align="right">
									<IconButton
										color="error"
										onClick={() => handleOpenDeletemodal(row)}
									>
										<Delete />
									</IconButton>
									<IconButton onClick={() => handleOpenEditmodal(row)}>
										<Edit />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								colSpan={3}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={editModalIsOpen}
				onClose={handleCloseEditModal}
				closeAfterTransition
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						maxWidth: 800,
						height: "70%",
						width: "100%",
						bgcolor: "var(--neutral100)",
						border: "1px solid var(--neutral300)",
						boxShadow: "0px 16px 32px rgba(23, 43, 77, 0.16)",
						p: 4,
						borderRadius: "0.5rem",
					}}
				>
					<FormationEditQuizzForm quizz={currentQuizz} />
				</Box>
			</Modal>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={deleteModalIsOpen}
				onClose={handleCloseDeleteModal}
				closeAfterTransition
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
					<Typography variant="h6" component="h2">
						Êtes-vous sûr de vouloir supprimer ce quizz ?
					</Typography>
					<Typography variant="body1" component="h2">
						{currentQuizz.title}
					</Typography>
					<Box
						sx={{
							display: "flex",
							columnGap: "0.5rem",
							justifyContent: "flex-end",
							paddingTop: "3rem",
						}}
					>
						<Button variant="contained" onClick={handleCloseDeleteModal}>
							Annuler
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleDeleteFormation}
						>
							{" "}
							Supprimer
						</Button>
					</Box>
				</Box>
			</Modal>
		</PageContainer>
	);
}
