import React, { useEffect, useState } from "react";
import stop from "../../../assests/images/stop.svg";
import play from "../../../assests/images/play.svg";
import trash from "../../../assests/images/trash.svg";
import toggle from "../../../assests/images/toggle.svg";

function SpooferTableRow({
  index,
  spoof,
  onDelete,
  onToggle,
  onStart,
  onStop,
}) {
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    if (spoof["status"] === "Stopped") {
      setIsStart(false);
    } else if (spoof["status"] === "Running") {
      setIsStart(true);
    }
  }, [spoof]);

  return (
    <div className="spoofer-page-table-header tbody">
      <div>{index}</div>
      <div>{spoof["url"]}</div>
      <div>{spoof["proxyName"]}</div>
      <div>{spoof["status"]}</div>
      <div>
        <div className="spoofer-table-row-action-col">
          <img onClick={() => onToggle(spoof)} src={toggle} alt="" />
          {!isStart ? (
            <img onClick={() => onStart(spoof, setIsStart)} src={play} alt="" />
          ) : (
            <img onClick={() => onStop(spoof, setIsStart)} src={stop} alt="" />
          )}

          <img onClick={() => onDelete(spoof)} src={trash} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SpooferTableRow;
