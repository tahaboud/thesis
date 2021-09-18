import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Dashboard = () => {
  const { equipements, tools, suppliers, workOrders } = useSelector(
    (state) => state.asset
  );
  return (
    <StyledDiv>
      <Grid
        container
        spacing={3}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={12}>
            Equipements <br /> {equipements ? equipements.length : 0}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={12}>
            Tools <br />
            {tools ? tools.length : 0}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={12}>
            Suppliers <br />
            {suppliers ? suppliers.length : 0}
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={12}>
            Work Orders <br />
            {workOrders ? workOrders.length : 0}
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

const StyledPaper = styled(Paper)`
  background-color: #383838;
  color: #ffffff;
  text-align: center;
  font-size: 2rem;
`;

const StyledDiv = styled.div`
  min-width: 100%;
`;

export default Dashboard;
