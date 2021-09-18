import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <h3>IMSI 2021</h3>
      <h3>&copy; BOUDOUAOUI TAHA | RIGUET HAMZA</h3>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  min-height: 10em;
  background-color: #757575;
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
