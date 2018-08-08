import { func } from "prop-types";
import React, { Component } from "react";
import { Storage } from "aws-amplify";
import Dropzone from "react-dropzone";
import Pica from "pica/dist/pica";
import shortUuid from "short-uuid";
import uuidv5 from "uuid/v5";
import sanitizeFilename from "sanitize-filename";

import {
  Container,
  FormItem,
  Label,
  Legend,
  Separator,
  TextInput
} from "interviewjs-styleguide";

const fileToKey = (data, storyId) => {
  const { name, type } = data;
  // console.log(name, type);

  let namespace = storyId;
  if (namespace.indexOf("_")) namespace = namespace.split("_").pop();
  if (namespace.length < 36) namespace = shortUuid().toUUID(namespace);

  const uuid = uuidv5(`${type},${name}`, namespace);
  return `${shortUuid().fromUUID(uuid)}-${name}`;
};

export default class ImageTab extends Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false, filename: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;

    const draft = {
      ...this.props.draft,
      [name]: value
    };

    this.props.updateDraft("image", draft);
  };

  handleBlob(blob, type, name) {
    const key = fileToKey(
      { type, name: sanitizeFilename(name.replace(/ /g, "_")) },
      this.props.story.id
    );
    Storage.put(
      `files/${this.props.user.id}/${this.props.story.id}/${key}`,
      blob,
      {
        bucket: "data.interviewjs.io",
        level: "public",
        contentType: type
      }
    )
      .then(async (result) => {
        console.log(result);
        this.setState(
          {
            draft: {
              ...this.state.draft,
              value: `https://story.interviewjs.io/files/${
                this.props.user.id
              }/${this.props.story.id}/${key}`,
              filename: name,
              title: this.props.draft.title
            },
            filename: name,
            uploading: false
          },
          () => this.props.updateDraft("image", this.state.draft)
        );
      })
      .catch((err) => console.log(err));
  }

  handleFile(f) {
    this.setState({ uploading: true });
    // console.log(f);
    const { type, preview, name } = f[0];
    if (type === "image/gif") {
      this.handleBlob(f[0], type, name);
    } else {
      // this.img.src = preview;
      const offScreenImage = document.createElement("img");
      offScreenImage.addEventListener("load", () => {
        const targetWidth =
          offScreenImage.width > 600 ? 600 : offScreenImage.width;
        const targetHeight = parseInt(
          targetWidth * offScreenImage.height / offScreenImage.width,
          10
        );
        console.log(
          `${offScreenImage.width} x ${
            offScreenImage.height
          } => ${targetWidth} x ${targetHeight}`
        );

        const offScreenCanvas = document.createElement("canvas");
        offScreenCanvas.width = targetWidth;
        offScreenCanvas.height = targetHeight;

        const pica = Pica({ features: ["js", "wasm", "ww"] });
        pica
          .resize(offScreenImage, offScreenCanvas, {
            unsharpAmount: 80,
            unsharpRadius: 0.6,
            unsharpThreshold: 2,
            transferable: true
          })
          .then((result) => pica.toBlob(result, "image/jpeg", 0.9))
          .then((blob) => this.handleBlob(blob, type, name)); // .catch(error => console.log(error)); // Raven should catch this
      });
      offScreenImage.src = preview;
    }
  }

  render() {
    const { title } = this.props.draft;
    return (
      <Container padded>
        <FormItem>
          <Label>Upload image</Label>
          <Dropzone
            accept="image/jpeg, image/jpg, image/svg, image/gif, image/png"
            ref={(node) => {
              this.dropzoneRef = node;
            }}
            onDrop={(accepted) => {
              this.handleFile(accepted);
            }}
            style={{ display: "none" }}
          >
            <p>Drop file here</p>
          </Dropzone>
          <TextInput
            file
            uploaded={this.state.filename}
            loading={this.state.uploading}
            onClick={() => {
              this.dropzoneRef.open();
            }}
          />
          <Legend tip="Select an image format with the extension .jpeg, .png, .svg or .gif.">
            i
          </Legend>
        </FormItem>
        <Separator silent size="s" />
        <FormItem>
          <Label>Image caption</Label>
          <TextInput
            text
            name="title"
            onChange={(e) => this.handleChange(e)}
            placeholder="Type your caption here"
            required
            type="text"
            value={title}
          />
          <Legend tip="Type text for image caption here">i</Legend>
        </FormItem>
      </Container>
    );
  }
}

ImageTab.propTypes = {
  updateDraft: func.isRequired
};

ImageTab.defaultProps = {};
