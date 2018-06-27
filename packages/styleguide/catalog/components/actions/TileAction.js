import styled from "styled-components";
import { bool } from "prop-types";

import { color, font, radius, setType, time } from "../../../utils";

const TileAction = styled.button`
  ${setType("x")};
  align-content: center;
  align-items: center;
  border-radius: ${radius.l};
  border-style: solid;
  border-width: 1px;
  box-shadow: 0 1px 2px ${color.shadowWt};
  cursor: pointer;
  display: flex !important;
  display: inline-block;
  flex-direction: column;
  font-family: ${font.sans};
  height: 106px;
  justify-content: center;
  line-height: 1.2em;
  width: 174px;
  outline: none;
  overflow-y: auto;
  padding: 1px;
  position: relative;
  text-align: center;
  transition: border ${time.m}, box-shadow ${time.s};
  &:active {
    box-shadow: none;
  }
  ${({ primary, secondary }) => {
    if (primary) {
      return `
        background: ${color.blueM};
        border-color: ${color.blueM};
        color: ${color.white};
      `;
    } else if (secondary) {
      return `
        background: ${color.white};
        border-color: ${color.greyHL};
        color: ${color.blueM};
      `;
    }
    return null;
  }};

  span {
    border-radius: ${radius.l};
    border: 1px solid ${color.white};
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    &::before {
      bottom: 0;
      content: " ";
      display: block;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  img,
  iframe {
    width: 170px;
  }
`;

TileAction.propTypes = {
  primary: bool,
  secondary: bool
};

TileAction.defaultProps = {
  primary: false,
  secondary: true
};

export default TileAction;
