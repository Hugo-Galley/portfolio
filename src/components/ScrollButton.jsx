import React from 'react';
import styled from 'styled-components';

export default function ScrollButton () {
  return (
    <StyledWrapper>
      <button className="btn">
        <div className="scroll"> </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .btn {
    width: 30px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    outline: 2px solid rgb(105, 127, 255);
    box-shadow: 0px 0px 10px rgb(105, 127, 255);
    position: relative;
  }

  .scroll {
    width: 5px;
    height: 10px;
    border-radius: 10px;
    background-color: rgb(105, 127, 255);
    box-shadow: 0px 0px 10px rgb(105, 127, 255);
    animation: scroll_4013 2s linear infinite;
    transform: translateY(40%);
  }

  .btn:after {
    content: 'scroll';
    position: absolute;
    top: 140%;
    color: whitesmoke;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  @keyframes scroll_4013 {
    0% {
      transform: translateY(40%);
    }

    50% {
      transform: translateY(90%);
    }
  };`;


