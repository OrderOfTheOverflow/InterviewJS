import css from "styled-components";
import { string } from "prop-types";

import { setType, skin } from "../../../utils";

const Text = css.span`
  font-family: ${skin.font};
  ${({ typo }) =>
    typo === "h1"
      ? `
    ${setType("l")};
    font-weight: bold;`
      : ``};
  }
  ${({ typo }) =>
    typo === "h2"
      ? `
        ${setType("m")};
        font-weight: bold;
        `
      : ``}
  ${({ typo }) =>
    typo === "h3"
      ? `
        ${setType("l")};
        font-style: italic;
        `
      : ``}
  ${({ typo }) =>
    typo === "h4"
      ? `
        ${setType("m")};
        font-style: italic;
        `
      : ``}
  ${({ typo }) =>
    typo === "h5"
      ? `
        ${setType("s")};
        font-style: italic;
        `
      : ``}
  ${({ typo }) =>
    typo === "h6"
      ? `
        ${setType("x")};
        font-style: italic;
        `
      : ``}
  ${({ typo }) =>
    typo === "p1"
      ? `
        ${setType("s")};
        font-weight: bold;
        `
      : ``}
  ${({ typo }) =>
    typo === "p2"
      ? `
        ${setType("s")};
        `
      : ``}
  ${({ typo }) =>
    typo === "p3"
      ? `
        ${setType("s")};
        font-style: italic;
        `
      : ``}
  ${({ typo }) =>
    typo === "p4"
      ? `
        ${setType("x")};
        font-weight: bold;
        `
      : ``}
  ${({ typo }) =>
    typo === "p5"
      ? `
        ${setType("x")};
        `
      : ``}
  ${({ typo }) =>
    typo === "p6"
      ? `
        ${setType("x")};
        font-style: italic;
        `
      : ``}
  & strong {
    font-weight: bold;
  }
`;

Text.propTypes = {
  typo: string
};

Text.defaultProps = {};

export default Text;
