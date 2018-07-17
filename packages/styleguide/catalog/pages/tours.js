import React, { Fragment } from "react";
import { markdown, ReactSpecimen } from "catalog";

import { Tour } from "../components";

export default () => markdown`

  ## Tours

  ${(
    <ReactSpecimen>
      <Fragment>
        <span className="step1">Element</span>
        <Tour
          run
          steps={[
            {
              title: "title",
              content: "This if my awesome feature!",
              target: ".step1",
              placement: "right",
              disableBeacon: true
            }
          ]}
          debug
        />
      </Fragment>
    </ReactSpecimen>
  )}

`;
