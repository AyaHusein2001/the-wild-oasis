import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute = ({ children }) => {
    
  const navigate = useNavigate();

  //1-load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  //3- if not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, isLoading]);

  //2-while loading , show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4- if authenticated, show the protected route (children)
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
