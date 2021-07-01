import React from 'react'
import styled from 'styled-components'

const StyledLoading = styled.div`
  .circle {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .circle div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: var(--color-accent);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .circle div:nth-child(1) {
    left: 8px;
    animation: circle1 0.6s infinite;
  }
  .circle div:nth-child(2) {
    left: 8px;
    animation: circle2 0.6s infinite;
  }
  .circle div:nth-child(3) {
    left: 32px;
    animation: circle2 0.6s infinite;
  }
  .circle div:nth-child(4) {
    left: 56px;
    animation: circle3 0.6s infinite;
  }
  @keyframes circle1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes circle3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes circle2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`

export default function Loading() {
  return (
    <StyledLoading>
      <div className="circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyledLoading>
  )
}
