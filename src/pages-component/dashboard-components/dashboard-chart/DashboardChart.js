import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./dashboardchart.css";
import chartbg from "../../../assests/images/chartbg.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpoofTableList,
  fetchLinkOpenerLogState,
  fetchLatestTweetList,
  fetchInviteJoinerLogState,
  fetchLinkOpnerArray,
  updateLinkOpnerArray,
  updateInviteJoinerArray,
  fetchInviteJoinerArray,
  fetchTwiterArray,
  updateTwiterArray,
  fetchSpooferArray,
  updatespooferArray,
  fetchThemsState,
} from "../../../features/counterSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  let dispatch = useDispatch();
  const appTheme = useSelector(fetchThemsState);

  const discord = useSelector(fetchLinkOpenerLogState);
  const inviteJoinerobj = useSelector(fetchInviteJoinerLogState);
  const twitterList = useSelector(fetchLatestTweetList);
  const spoofList = useSelector(fetchSpoofTableList);

  const lnlArr = useSelector(fetchLinkOpnerArray);
  const IJArr = useSelector(fetchInviteJoinerArray);
  const TWArr = useSelector(fetchTwiterArray);
  const SPArr = useSelector(fetchSpooferArray);

  let lO = [0, 0, 0, 0, 0, 0, 0];
  let IJ = [0, 0, 0, 0, 0, 0, 0];
  let TM = [0, 0, 0, 0, 0, 0, 0];
  let SO = [0, 0, 0, 0, 0, 0, 0];

  const options = {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
      },
    },
    maintainAspectRatio: true,
    hover: {
      intersect: false,
    },
    tension: 0.5,
    borderCapStyle: "round",
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true,
          borderColor: "#0d0027",
          color: "#161037",
        },
        ticks: {
          color: appTheme ? "#0D0027" : "#FFFFFF",
          fontFamily: "Poppins",
        },
      },
      y: {
        grid: {
          display: true,
          borderColor: "#161037",
          color: "#161037",
        },
        ticks: {
          stepSize: 1,
          color: appTheme ? "#0D0027" : "#FFFFFF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "white",
        },
      },
    },
  };

  const setDataInLO = () => {
    let temp = [];
    let arr = discord ? Object.values(discord) : [];
    for (let j = 0; j < arr.length; j++) {
      if (!lnlArr.includes(arr[j])) {
        temp.push(arr[j]);
      }
    }
    if (temp.length) {
      dispatch(updateLinkOpnerArray([...temp, ...lnlArr]));
    }

    for (let i = 0; i < lnlArr.length; i++) {
      if (lnlArr[i].indexOf("Mon") > 0) lO[0] = lO[0] + 1;
      if (lnlArr[i].indexOf("Tus") > 0) lO[1] = lO[1] + 1;
      if (lnlArr[i].indexOf("Wed") > 0) lO[2] = lO[2] + 1;
      if (lnlArr[i].indexOf("Thr") > 0) lO[3] = lO[3] + 1;
      if (lnlArr[i].indexOf("Fri") > 0) lO[4] = lO[4] + 1;
      if (lnlArr[i].indexOf("Sat") > 0) lO[5] = lO[5] + 1;
      if (lnlArr[i].indexOf("Sun") > 0) lO[6] = lO[6] + 1;
    }
    return lO;
  };

  const setDataInIJ = () => {
    let temp = [];
    let arr = inviteJoinerobj ? Object.values(inviteJoinerobj) : [];
    for (let j = 0; j < arr.length; j++) {
      if (!IJArr.includes(arr[j])) {
        temp.push(arr[j]);
      }
    }
    if (temp.length) {
      dispatch(updateInviteJoinerArray([...temp, ...IJArr]));
    }

    for (let i = 0; i < IJArr.length; i++) {
      if (IJArr[i].indexOf("Mon") > 0) IJ[0] = IJ[0] + 1;
      if (IJArr[i].indexOf("Tus") > 0) IJ[1] = IJ[1] + 1;
      if (IJArr[i].indexOf("Wed") > 0) IJ[2] = IJ[2] + 1;
      if (IJArr[i].indexOf("Thr") > 0) IJ[3] = IJ[3] + 1;
      if (IJArr[i].indexOf("Fri") > 0) IJ[4] = IJ[4] + 1;
      if (IJArr[i].indexOf("Sat") > 0) IJ[5] = IJ[5] + 1;
      if (IJArr[i].indexOf("Sun") > 0) IJ[6] = IJ[6] + 1;
    }
    return IJ;
  };
  const setDataInTM = () => {
    let temp = [];
    let tweetsAr = Object.values(twitterList);
    for (let i = 0; i < tweetsAr.length; i++) {
      let dec = true;
      for (let j = 0; j < TWArr.length; j++) {
        if (tweetsAr[i].id === TWArr[j].id) {
          dec = false;
        }
      }
      if (dec) {
        temp.push(tweetsAr[i]);
      }
    }
    if (temp.length > 0) {
      dispatch(updateTwiterArray([...temp, ...tweetsAr]));
    }
    for (let i = 0; i < TWArr.length; i++) {
      if (TWArr[i].createAt.indexOf("Mon") >= 0) TM[0] = TM[0] + 1;
      if (TWArr[i].createAt.indexOf("Tus") >= 0) TM[1] = TM[1] + 1;
      if (TWArr[i].createAt.indexOf("Wed") >= 0) TM[2] = TM[2] + 1;
      if (TWArr[i].createAt.indexOf("Thr") >= 0) TM[3] = TM[3] + 1;
      if (TWArr[i].createAt.indexOf("Fri") >= 0) TM[4] = TM[4] + 1;
      if (TWArr[i].createAt.indexOf("Sat") >= 0) TM[5] = TM[5] + 1;
      if (TWArr[i].createAt.indexOf("Sun") >= 0) TM[6] = TM[6] + 1;
    }
    return TM;
  };
  const setDataInSp = () => {
    let temp = [];
    let spoofAr = Object.values(spoofList);
    if (SPArr.legend === 0) {
      dispatch(updatespooferArray([...spoofAr]));
    } else {
      for (let i = 0; i < spoofAr.length; i++) {
        let dec = true;
        for (let j = 0; j < SPArr.length; j++) {
          if (spoofAr[i].id === SPArr[j].id) {
            dec = false;
          }
        }
        if (dec) {
          temp.push(spoofAr[i]);
        }
      }
    }

    if (temp.length > 0) {
      dispatch(updatespooferArray([...temp, ...SPArr]));
    }
    for (let i = 0; i < SPArr.length; i++) {
      if (SPArr[i].createdAt.indexOf("Mon") >= 0) SO[0] = SO[0] + 1;
      if (SPArr[i].createdAt.indexOf("Tue") >= 0) SO[1] = SO[1] + 1;
      if (SPArr[i].createdAt.indexOf("Wed") >= 0) SO[2] = SO[2] + 1;
      if (SPArr[i].createdAt.indexOf("Thr") >= 0) SO[3] = SO[3] + 1;
      if (SPArr[i].createdAt.indexOf("Fri") >= 0) SO[4] = SO[4] + 1;
      if (SPArr[i].createdAt.indexOf("Sat") >= 0) SO[5] = SO[5] + 1;
      if (SPArr[i].createdAt.indexOf("Sun") >= 0) SO[6] = SO[6] + 1;
    }
    return SO;
  };

  const labels = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
  const colors = ["#FB49C0", "#3EB7E5", "#0D24EF", "#F5A623"];
  const data = {
    fillOpacity: 0.3,
    labels,
    datasets: [
      {
        data: setDataInLO(),
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        data: setDataInIJ(),
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        data: setDataInTM(),
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        data: setDataInSp(),
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset, i) => ({
      ...dataset,
      borderColor: colors[i],
    })),
  };
  return (
    <div className="dashboardchart">
      <img src={chartbg} alt="" className="chartbg" />
      <Line data={chartData} options={{ ...options }} />
    </div>
  );
};

export default DashboardChart;
