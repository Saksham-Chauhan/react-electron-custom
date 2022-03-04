import React from "react";
import plus from "../../../assests/images/plus.svg";
import edit from "../../../assests/images/edit.svg";
import trash from "../../../assests/images/trash.svg";
import "./styles.css";
import { AppSpacer } from "../../../component";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClaimerGroupList,
  setEditStorage,
  setModalState,
} from "../../../features/counterSlice";
import { deleteClaimerGroupFromList } from "../../../features/logic/setting";

function CalimerGroup() {
  const dispatch = useDispatch();
  const list = useSelector(fetchClaimerGroupList);

  const handleOpenModal = () => {
    dispatch(setModalState("claimerGroup"));
  };

  const handleEdit = (group) => {
    dispatch(setEditStorage(group));
    handleOpenModal();
  };

  const handleDelete = (group) => {
    dispatch(deleteClaimerGroupFromList(group));
  };

  return (
    <div className="claimer-group-outer">
      <div className="claimer-flex">
        <h3>Claimer Group</h3>
        <div onClick={handleOpenModal} className="claimer-add-btn btn">
          <img src={plus} alt="" />
        </div>
      </div>
      <AppSpacer spacer={14} />
      <div className="claimer-group-list-scroll-list">
        {list.map((group) => (
          <div key={group["id"]} className="claimer-group-list-item">
            <span>{group["name"]}</span>
            <div className="claimer-group-item-action">
              <img onClick={() => handleEdit(group)} src={edit} alt="" />
              <img onClick={() => handleDelete(group)} src={trash} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalimerGroup;
