import { useDispatch } from "react-redux";
import { updateTaskState } from "../features/logic/acc-changer";

export const useUpdateTaskStatus = () => {
  const dispatch = useDispatch();
  const updateTask = (obj) => {
    dispatch(updateTaskState(obj));
  };
  return updateTask;
};
