import styled from "styled-components";
import { Link } from "react-router-dom";

export const HomeWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const RecommenderWrapper = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const InputWrapper = styled.div({
  display: "flex",
});

export const ExploreModelInput = styled.div({
  width: "80%",
});
