import styled from "styled-components";
import {} from "prop-types";

import { radius } from "../../../utils";

const Tiles = styled.div`
  align-content: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  & > * {
    border-radius: ${radius.n};
  }
  & > *:first-child {
    border-radius: ${radius.l} ${radius.n} ${radius.n} ${radius.l};
  }
  & > *:last-child {
    border-radius: ${radius.n} ${radius.l} ${radius.l} ${radius.n};
  }
`;

Tiles.propTypes = {};

Tiles.defaultProps = {};

export default Tiles;
