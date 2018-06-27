import styled from "styled-components";
import {} from "prop-types";

import { radius } from "../../../utils";

const Tiles = styled.div`
  align-content: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  text-align: center;
  & > * {
    border-radius: ${radius.n} !important;
  }
  & > *:first-child {
    border-radius: ${radius.l} ${radius.n} ${radius.n} ${radius.l} !important;
  }
  & > *:last-child {
    border-radius: ${radius.n} ${radius.l} ${radius.l} ${radius.n} !important;
  }
`;

Tiles.propTypes = {};

Tiles.defaultProps = {};

export default Tiles;
