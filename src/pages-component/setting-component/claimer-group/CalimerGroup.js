import React from "react";
import plus from "../../../assests/images/plus.svg";
import UseAnimations from "react-useanimations";
import trash2 from "react-useanimations/lib/trash2";
import edit from "react-useanimations/lib/edit";
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
        <h3>Token Group</h3>
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
              <UseAnimations
                onClick={() => handleEdit(group)}
                animation={edit}
                strokeColor="#ffff"
                size={20}
                wrapperStyle={{ cursor: "pointer" }}
              />
              <UseAnimations
                onClick={() => handleDelete(group)}
                animation={trash2}
                strokeColor="#B60E0E"
                size={22}
                wrapperStyle={{ cursor: "pointer", paddingBottom: "3px" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalimerGroup;
