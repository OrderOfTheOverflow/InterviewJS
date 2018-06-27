import styled from "styled-components";
import { array, func, node, oneOfType, string } from "prop-types";

import { color, font, radius, setSpace, setType, time } from "../../../utils";

const Tile = styled.button`
  ${setSpace("pam")};
  ${setType("x")};
  cursor: pointer;
  align-content: center;
  align-items: stretch;
  background: none;
  border-radius: ${radius.l};
  border: 1px solid ${color.greyHL};
  color: ${({ paint }) => paint};
  display: flex;
  flex-direction: column;
  font-family: ${font.sans};
  justify-content: flex-start;
  outline: none;
  position: relative;
  width: 100%;
  transition: border ${time.m};
  &:not(:first-child) {
    margin-left: -1px;
  }
  &:hover {
    border-color: ${({ paint }) => paint};
    z-index: 5;
  }
  & > * {
    ${setSpace("mbs")};
  }
`;

Tile.propTypes = {
  children: oneOfType([array, string, node]).isRequired,
  onClick: func,
  paint: string
};

Tile.defaultProps = {
  onClick: null,
  paint: color.blueM
};

export default Tile;
