import React from "react";
import "./addGmail.css";
import { ModalWrapper, AppInputField, AppSpacer } from "../../component";

import { setModalState } from "../../features/counterSlice";
import { useDispatch } from "react-redux";
import { OneClick } from "../../pages-component";

const AddGmail = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {};

  const handleSubmit = () => {};

  return (
    <ModalWrapper>
      <div className="Addgmail">
        <div className="inputs">
          <div className="title">
            <OneClick title="Add-Gmail" subTitle=" " />
          </div>

          <div className="gmail_password">
            <AppInputField
              placeholderText="Enter Email"
              fieldTitle="Email"
              name="groupName"
            />

            <AppInputField
              placeholderText="Enter Password"
              fieldTitle="Password"
              name="groupName"
            />
          </div>
          <div className="security">
            <AppInputField
              placeholderText="Enter Security Answer"
              fieldTitle="Security Answer"
              name="groupName"
            />
          </div>

          <div className="security">
            <AppInputField
              placeholderText="Enter Recovery Email"
              fieldTitle="Recovery Email"
              name="groupName"
            />
          </div>
          <AppSpacer spacer={25} />
          <div className="btn">
            <button onClick={handleCloseModal}>Close</button>
            <button onClick={handleSubmit}> Create</button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AddGmail;
