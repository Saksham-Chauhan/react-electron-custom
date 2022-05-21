import { toast } from "react-toastify";
import downloadIcon from "../assests/images/download-icon.svg";
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

export const toastSuccess = (msg) => {
  if (!msg) return;
  toast.success(msg, TOAST_CONFIGURATION);
};

export const toastWarning = (msg = "") => {
  toast.warn(msg, { ...TOAST_CONFIGURATION });
};

export const toastInfo = (msg = "") => {
  toast.info(msg, TOAST_CONFIGURATION);
};

export const progressToast = (percent = 0) => {
  toast(
    (pre) => (
      <div className={`notification toast`}>
        <div className="notification-image">
          <img src={downloadIcon} alt="" />
        </div>
        <div className="notification-content">
          <p className="notification-title">
            Downloading Update
            <span className="progress-value">({percent}%)</span>
          </p>
        </div>
      </div>
    ),
    {
      position: "top-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
    }
  );
};
