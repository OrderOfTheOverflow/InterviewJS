import styled from "styled-components";

import { Container, color } from "interviewjs-styleguide";

const PageFoot = styled(Container)`
  align-content: stretch;
  align-items: center;
  border-left: 1px solid ${color.greyHL};
  border-right: 1px solid ${color.greyHL};
  border-top: 1px solid ${color.greyHL};
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding-top: 10px;
  width: 100%;
`;

export default PageFoot;
