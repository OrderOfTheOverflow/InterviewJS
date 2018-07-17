import React, { Fragment } from "react";
import { markdown, ReactSpecimen } from "catalog";

import { Tour } from "../components";

export default () => markdown`

  ## Tour w/ beacons

  ${(
    <ReactSpecimen>
      <Fragment>
        <span className="step2">Element</span>
        <Tour
          run
          steps={[
            {
              title: "A title",
              content: "This if my awesome feature!",
              target: ".step2",
              placement: "right"
            }
          ]}
          debug
        />
      </Fragment>
    </ReactSpecimen>
  )}

  ## Tour w/o beacons

  ${(
    <ReactSpecimen>
      <Fragment>
        <span className="step1">Element</span>
        <Tour
          run
          steps={[
            {
              title: "A title",
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
