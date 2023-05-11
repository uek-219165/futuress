import React from "react";
import styled from "styled-components";
import Spinner from "./Spinner";

const SplashScreen = () => {
  return (
    <Splash>
      <img
        className="logo-spinner"
        src="./assets/logo-dark.svg"
        alt="Futuress"
      />
      <div className="loader">
        Loading
        <Spinner dark={true} />
      </div>
    </Splash>
  );
};

const Splash = styled.div`
  @keyframes loading {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;

  .logo-spinner {
    transition: transform 0.3s;
    animation: loading 0.5s ease-in forwards;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    gap: 20px;
    color: #000;
  }
`;

export default SplashScreen;
