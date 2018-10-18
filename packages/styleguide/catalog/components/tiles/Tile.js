import styled from "styled-components";
import { array, func, node, oneOfType, string } from "prop-types";

import { color, font, radius, setSpace, setType } from "../../../utils";

const Tile = styled.button`
  ${setSpace("pam")};
  ${setType("x")};
  align-content: center;
  align-items: center;
  background: none;
  border-radius: ${radius.l};
  border: none;
  color: ${({ paint }) => paint};
  cursor: pointer;
  display: flex !important;
  flex-direction: column;
  font-family: ${font.sans};
  justify-content: center;
  line-height: 1.2em;
  outline: none;
  position: relative;
  text-align: center !important;
  &:not(:first-child) {
    margin-left: -1px;
  }
  &:hover {
    z-index: 5;
  }
  & > div {
    ${setSpace("mts")};
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
