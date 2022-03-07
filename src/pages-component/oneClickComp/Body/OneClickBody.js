import React from "react";
import "./OneClickBody.css";
import rigthTic from "../../../assests/images/oneclick_success.svg";
import questionMark from "../../../assests/images/oneclick_idle.svg";
import FlopTic from "../../../assests/images/oneclick_warning.svg";
import chemistry from "../../../assests/images/chemistry.svg";
import play from "../../../assests/images/play.svg";
import UseAnimations from 'react-useanimations';
import trash2 from 'react-useanimations/lib/trash2';

const TableData = [
  {
    no: "1",
    email: "email@gmail.com",
    oneClick: rigthTic,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.7",
    Action: [play, chemistry],
  },
  {
    no: "2",
    email: "email@gmail.com",
    oneClick: FlopTic,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.8",
    Action: [play, chemistry],
  },
  {
    no: "3",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.8",
    Action: [play, chemistry],
  },
  {
    no: "4",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "0.8",
    Action: [play, chemistry],
  },
  {
    no: "5",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, chemistry],
  },
  {
    no: "6",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, chemistry],
  },
  {
    no: "7",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, chemistry],
  },
  {
    no: "8",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, chemistry],
  },
  {
    no: "9",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, chemistry],
  },
  {
    no: "10",
    email: "email@gmail.com",
    oneClick: questionMark,
    Prosy: "none",
    Status: "watching Youtube",
    Score: "N/A",
    Action: [play, chemistry],
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
        <li>Actions</li>
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
          <div className="oneclick-actions">
        <img src={play} className="btn" alt="" />
        <img src={chemistry} className="btn" alt="" />
        <UseAnimations animation={trash2} strokeColor="#B60E0E" size={25} wrapperStyle={{cursor:"pointer"}}></UseAnimations>
      </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default OneClickBody;
