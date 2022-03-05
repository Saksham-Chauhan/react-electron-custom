import { toast } from "react-toastify";

export const MAX_TOAST_LIMIT = 3;

const TOAST_CONFIGURATION = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastSuccess = (msg = "🦄 Wow so easy!") => {
  toast.success(msg, TOAST_CONFIGURATION);
};

export const toastWarning = (msg = "🦄 Wow so easy!") => {
  toast.warn(msg, { ...TOAST_CONFIGURATION });
};

export const toastInfo = (msg = "🦄 Wow so easy!") => {
  toast.info(msg, TOAST_CONFIGURATION);
};
