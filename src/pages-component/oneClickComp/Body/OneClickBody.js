import React from "react";
import "./OneClickBody.css";
import rigthTic from "../../../assests/sidebarImage/rigthTic.svg";
import questionMark from "../../../assests/sidebarImage/questionMark.svg";
import FlopTic from "../../../assests/sidebarImage/FlopTic.svg";
import chemistry from "../../../assests/images/chemistry.svg";
import play from "../../../assests/sidebarImage/play.svg";
import trash from "../../../assests/images/trash.svg";
import edit from "../../../assests/images/edit.svg";

const TableData = [
  {
    no: "1",
    email: "email@gmail.com",
    oneClick: rigthTic,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.7",
    Action: [play, edit, trash],
  },
  {
    no: "2",
    email: "email@gmail.com",
    oneClick: FlopTic,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.8",
    Action: [play, edit, trash],
  },
  {
    no: "3",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.8",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "4",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.8",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "5",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "6",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "7",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "8",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "9",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, edit, trash, chemistry],
  },
  {
    no: "10",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, edit, trash, chemistry],
  },
];

const OneClickBody = () => {
  return (
    <div className="SectionTwo">
      <ul>
        <li>#</li>
        <li>Email</li>
        <li>One-Click</li>
        <li>Proxy</li>
        <li>Status</li>
        <li>Score</li>
        <li>Action</li>
      </ul>

      {TableData.map((data, idx) => (
        <ul key={idx} className="Proxy_list">
          <li>{data.no}</li>
          <li>{data.email}</li>
          <li style={{ paddingLeft: "20px" }}>
            <img src={data.oneClick} alt="img" />
          </li>
          <li>{data.Prosy}</li>
          <li>{data.Status}</li>
          <li style={{ paddingLeft: "20px" }}>{data.Score}</li>
          <li>
            {/* Icons ? */}
            {data.Action.map((Icon, idx) => (
              <img src={Icon} alt={Icon} key={idx} />
            ))}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default OneClickBody;
