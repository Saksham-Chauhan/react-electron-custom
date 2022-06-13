import React from "react";
import { AppInputField, AppSpacer } from "../../../component";
import {
  ModalFlexInnerRow,
  ModalFlexOuterRow,
} from "../../../component/modal-wrapper/Modal";
import Spacer from "../../../component/spacer/Spacer";

const getRandomNum = () => {
  const num = Math.floor(Math.random() * 800 + 1);
  return num;
};
const api = [
  {
    label: "Rick & Morty API",
    value: `https://rickandmortyapi.com/api/character/avatar/${getRandomNum()}.jpeg`,
  },
];

function AvatarChanger({ handleSelectAPI, handleUpload, obj, ...props }) {
  const defApi = {
    label: "Default API",
    value: "https://picsum.photos/v2/list",
  };
  return (
    <React.Fragment>
      <AppSpacer spacer={10} />
      <ModalFlexOuterRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="Delay (Optional)"
            placeholderText="Enter Delay (in seconds)"
            name="delay"
            type="number"
            min={0}
            {...props}
          />
        </ModalFlexInnerRow>
        <ModalFlexInnerRow>
          <AppInputField
            fieldTitle="API"
            placeholderText="Select API"
            selectOptions={api}
            isSelect={true}
            onChange={handleSelectAPI}
            defaultValue={defApi}
          />
        </ModalFlexInnerRow>
      </ModalFlexOuterRow>
      <Spacer spacer={10} />
      <ModalFlexInnerRow>
        <h3 className="img-lable">Uplaod Image</h3>
        <div className="img-field">
          {obj.imgname ? obj.imgname : <span>Upload Image</span>}
          <input
            // className="img-field"
            onChange={handleUpload}
            type="file"
            // multiple
            accept="image/*"
          />
        </div>
      </ModalFlexInnerRow>
    </React.Fragment>
  );
}

export default AvatarChanger;
