import {Box, Button} from "@mui/material";
import styled from "styled-components";

import LearnTraining from "@images/learn-training.png";
import TeachTraining from "@images/teach-training.png";

const StyledChoiceBox = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid black;
  border-radius: 1em;
  padding: 1em;


  img {
	width: 50%;
  }

`; 
  
const Formations = () => {

	return (
		<StyledChoiceBox>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
			<img src={LearnTraining} alt="Learn training"/>
			<Button variant="contained">Learn</Button>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
			<img src={TeachTraining} alt="Teach training"/>
			<Button variant="contained">Learn</Button>
			</Box>
		

		</StyledChoiceBox>

	)
};

export default Formations;
