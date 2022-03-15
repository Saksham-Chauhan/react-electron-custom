import React, { useEffect, useState } from "react";
import stop from "../../../assests/images/stop.svg";
import play from "../../../assests/images/play.svg";
import toggle from "../../../assests/images/toggle.svg";
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';

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
          <img onClick={() => onToggle(spoof)} src={toggle} alt="" style={{width:22}}/>
          {!isStart ? (
            <img onClick={() => onStart(spoof, setIsStart)} src={play} alt="" style={{width:18}}/>
          ) : (
            <img onClick={() => onStop(spoof, setIsStart)} src={stop} alt="" />
          )}
          <UseAnimations onClick={() => onDelete(spoof)} animation={trash2} strokeColor="#B60E0E" size={26} wrapperStyle={{cursor:"pointer", paddingBottom:"4px"}}></UseAnimations>
        </div>
      </div>
    </div>
  );
}

export default SpooferTableRow;
