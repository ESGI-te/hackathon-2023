import { Box, Button } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LearnTraining from "@images/learn-training.png";
import TeachTraining from "@images/teach-training.png";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const StyledChoiceBox = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid black;
  border-radius: 1em;
  padding: 1em;
  width: 80%;
  margin: 4em auto;

  img {
    width: 60%;
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
		  justifyContent: "flex-end"
        }}
      >
        <img src={LearnTraining} alt="Learn training" />
        <Button variant="contained" 
		as={Link}
		to={`/formations/1`} sx={{
			display: "flex" ,
		}}>
          Voir mes formations suivies
          <ArrowRightAltIcon sx={{
			marginLeft: "0.5em"
		  }}/>
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
		  justifyContent: "flex-end"
        }}
      >
        <img src={TeachTraining} alt="Teach training" />
        <Button variant="contained"
			as={Link}
			to={`/teaching/formations`} sx={{
				display: "flex" ,
			}}>
          Voir mes formations enseignées
          <ArrowRightAltIcon sx={{
			marginLeft: "0.5em"
		  }}/>
        </Button>
      </Box>
    </StyledChoiceBox>
  );
};

export default Formations;
