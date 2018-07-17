import React, { Fragment } from "react";
import { markdown, ReactSpecimen } from "catalog";

import { Tour } from "../components";

export default () => markdown`

  ## Tour w/ beacons

  ${(
    <ReactSpecimen>
      <Fragment>
        <span className="step11" style={{ marginRight: "20px" }}>
          Element
        </span>
        <span className="step12">Element</span>
        <Tour
          run
          steps={[
            {
              title: "A title",
              content: "This if my awesome feature!",
              target: ".step11",
              placement: "right"
            },
            {
              title: "A title",
              content: "This if my awesome feature!",
              target: ".step12",
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
        <span className="step21" style={{ marginRight: "20px" }}>
          Element
        </span>
        <span className="step22">Element</span>
        <Tour
          run
          steps={[
            {
              title: "A title",
              content: "This if my awesome feature!",
              target: ".step21",
              placement: "right",
              disableBeacon: true
            },
            {
              title: "A title",
              content: "This if my awesome feature!",
              target: ".step22",
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
