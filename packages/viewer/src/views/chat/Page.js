import css from "styled-components";

import { color } from "interviewjs-styleguide";

const Page = css.div`
  background: ${color.white};
  min-height: 100%;
  min-width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export default Page;
