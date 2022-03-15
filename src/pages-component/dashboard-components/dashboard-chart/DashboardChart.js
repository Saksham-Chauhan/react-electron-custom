import React, { useEffect } from "react";
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
  addlastDate,
  addlastWeekInvite,
  addlastWeekLink,
  addlastWeekSpoofs,
  addlastWeekTweets,
  fetchInvite,
  fetchLastDate,
  fetchLastWeekInvites,
  fetchLastWeekLinks,
  fetchLastWeekSpoof,
  fetchLastWeekTweets,
  fetchLink,
  fetchSpoof,
  fetchSpoofTableList,
  fetchTweets,
  fetchTwitterKeywordList,
  updateTweetsArray,
  updateSpoofArray,
  updateLinkArray,
  updateInviteArray,
  fetchLinkOpenerLogState,
  fetchInviteJoinerLogState,
} from "../../../features/counterSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

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
        color: "#FFFFFF",
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
        color: "#FFFFFF",
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

const DashboardChart = () => {
  let dispatch = useDispatch();
  //GET STATE OF LINK OPNER,INVITE JOINER,TWITTER AND SPOOFER
  const discord = useSelector(fetchLinkOpenerLogState);
  const inviteJoinerobj = useSelector(fetchInviteJoinerLogState);
  const twitterList = useSelector(fetchTwitterKeywordList);
  const spoofList = useSelector(fetchSpoofTableList);
  const lastDate = useSelector(fetchLastDate);

  // // //GET THE LAST WEEK DATA
  const lastWeekLink = useSelector(fetchLastWeekLinks);
  const lastWeekInvites = useSelector(fetchLastWeekInvites);
  const lastWeekTweets = useSelector(fetchLastWeekTweets);
  const lastWeekSpoof = useSelector(fetchLastWeekSpoof);

  // //PAGES DATA GETTING FROM REDUCERS
  const linkOpnerData = Object.keys(discord).length;
  const inviteJoinerData = Object.keys(inviteJoinerobj).length;
  const twitterData = twitterList.length;
  const spooferData = spoofList.length;

  // //FOR CHART
  let li = useSelector(fetchLink);
  let inv = useSelector(fetchInvite);
  let tw = useSelector(fetchTweets);
  let sp = useSelector(fetchSpoof);

  useEffect(() => {
    //temp variables
    let l = [...li];
    let i = [...inv];
    let t = [...tw];
    let s = [...sp];
    const setPagesData = () => {
      let date = new Date();
      let day = date.getDay();
      if (day > lastDate) {
        dispatch(addlastWeekLink(linkOpnerData));
        dispatch(addlastWeekInvite(inviteJoinerData));
        dispatch(addlastWeekTweets(twitterData));
        dispatch(addlastWeekSpoofs(spooferData));
        dispatch(addlastDate(day));
      }
      if (day === 0) {
        l = [0, 0, 0, 0, 0, 0, 0];
        l[day] = linkOpnerData - lastWeekLink;
        dispatch(updateLinkArray(l));
        i = [0, 0, 0, 0, 0, 0, 0];
        i[day] = inviteJoinerData - lastWeekInvites;
        dispatch(updateInviteArray(i));
        t = [0, 0, 0, 0, 0, 0, 0];
        t[day] = twitterData - lastWeekTweets;
        dispatch(updateTweetsArray(t));
        s = [0, 0, 0, 0, 0, 0, 0];
        s[day] = spooferData - lastWeekSpoof;
        dispatch(updateSpoofArray(s));
        dispatch(addlastDate(day));
      } else {
        l[day] = linkOpnerData - lastWeekLink;
        dispatch(updateLinkArray(l));
        i[day] = inviteJoinerData - lastWeekInvites;
        dispatch(updateInviteArray(i));
        t[day] = twitterData - lastWeekTweets;
        dispatch(updateTweetsArray(t));
        s[day] = spooferData - lastWeekSpoof;
        dispatch(updateSpoofArray(s));
      }
    };
    setPagesData();
  }, [
    discord,
    inviteJoinerobj,
    twitterList,
    spoofList,
    dispatch,
    inviteJoinerData,
    lastDate,
    lastWeekInvites,
    lastWeekLink,
    lastWeekSpoof,
    lastWeekTweets,
    linkOpnerData,
    spooferData,
    twitterData,
  ]);
  //CHART DATA
  const labels = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
  const colors = ["#FB49C0", "#0D24EF", "#F5A623", "#3EB7E5"];
  const data = {
    fillOpacity: 0.3,
    labels,
    datasets: [
      {
        data: [...li],
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        data: [...inv],
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        data: [...tw],
        pointRadius: 0,
        borderWidth: 3,
      },
      {
        data: [...sp],
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
      <Line data={chartData} options={{ ...options }} />;
    </div>
  );
};

export default DashboardChart;
