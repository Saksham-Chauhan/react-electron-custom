import React from "react";
import "./styles.css";
import {
  closeApp,
  minimizeApp,
  maximizeApp,
} from "../../helper/electron-bridge";
import { DocsEndPoint } from "../../constant";

function WindowBtns({ location }) {
  return (
    <div className="window-buttons" id="window-buttons">
      <div
        onClick={() => window.open(DocsEndPoint[location.pathname])}
        className="window-button help"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00008 12.8333C10.2217 12.8333 12.8334 10.2216 12.8334 6.99996C12.8334 3.7783 10.2217 1.16663 7.00008 1.16663C3.77842 1.16663 1.16675 3.7783 1.16675 6.99996C1.16675 10.2216 3.77842 12.8333 7.00008 12.8333Z"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.30249 5.24997C5.43963 4.86011 5.71033 4.53136 6.06663 4.32196C6.42293 4.11256 6.84185 4.03601 7.24918 4.10588C7.65651 4.17575 8.02597 4.38752 8.29212 4.70369C8.55827 5.01986 8.70394 5.42002 8.70332 5.8333C8.70332 6.99997 6.95332 7.5833 6.95332 7.5833"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 9.91663H7.00583"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div onClick={minimizeApp} className="window-button yellow">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
          <rect
            fill="#975500"
            width="8"
            height="2"
            x="2"
            y="5"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <div onClick={maximizeApp} className="window-button green">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
          <g fill="#006500" fillRule="evenodd">
            <path
              d="M5,3 C5,3 5,6.1325704 5,6.48601043 C5,6.83945045 5.18485201,7 5.49021559,7 L9,7 L9,6 L8,6 L8,5 L7,5 L7,4 L6,4 L6,3 L5,3 Z"
              transform="rotate(180 7 5)"
            />
            <path d="M3,5 C3,5 3,8.1325704 3,8.48601043 C3,8.83945045 3.18485201,9 3.49021559,9 L7,9 L7,8 L6,8 L6,7 L5,7 L5,6 L4,6 L4,5 L3,5 Z" />
          </g>
        </svg>
      </div>
      <div onClick={closeApp} className="window-button red">
        <svg aria-hidden="false" width="12" height="12" viewBox="0 0 12 12">
          <path
            stroke="#4c0000"
            fill="none"
            d="M8.5,3.5 L6,6 L3.5,3.5 L6,6 L3.5,8.5 L6,6 L8.5,8.5 L6,6 L8.5,3.5 Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default WindowBtns;
