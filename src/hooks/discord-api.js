import { useDispatch } from "react-redux";
import { directDiscordJoinAPI, generateRandomAvatar, getProxy } from "../api";
import {
  updatePasswordChangerStatus,
  updateStatusOfTableRow,
  updateTaskState,
} from "../features/logic/acc-changer";
import serverLeaverAPI from "../api/account-changer/leave-server";
import usernameChangerAPI from "../api/account-changer/username-changer";
import activityChangerAPI from "../api/account-changer/activity-changer";
import nicknameChangerAPI from "../api/account-changer/nickname-changer";
import passwordChangerAPI from "../api/account-changer/password-changer";
import tokenCheckerAPI from "../api/account-changer/token-checker";
import tokenRetrieverAPI from "../api/account-changer/token-changer";
import avatarChangerAPI from "../api/account-changer/avatar-changer";
import Chance from "chance";
import { generateRandomPassword, sleep } from "../helper";

// const tokenMsg = "Invalid format, Token not found in Discord Accounts.";
// const passMsg = "Invalid format, Password not found.";
// const emailMsg = "Invalid format, Email not found.";
const getTokenList = (obj) => obj.claimerGroup["value"]?.split("\n");

export const useMassInviteJoiner = () => {
  const dispatch = useDispatch();
  const callApi = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    dispatch(updateStatusOfTableRow(obj, "Monitoring"));
    const { proxyGroup } = obj;
    const inviteCodeList = obj.inviteCodes?.split("\n");
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length * inviteCodeList.length;
    for (let index = 0; index < tokenArray.length; index++) {
      for (let i = 0; i < inviteCodeList.length; i++) {
        const proxy = getProxy(proxyGroup["value"].split("\n"));
        let code = inviteCodeList[i];
        try {
          const response = await directDiscordJoinAPI(
            proxy,
            code,
            tokenArray[index]?.split(":")[2],
            obj
          );
          if (response.status === 200 || response.status === 204) {
            counter++;
          }
        } catch (error) {
          console.log("Something went wrong while mass joiner", error.message);
        }
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return callApi;
};

export const useServerLeaver = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const serverIdArray = obj.serverIDs?.split("\n");
    if (serverIdArray.length > 0) {
      const tokenArray = getTokenList(obj);
      const maxLoop = tokenArray.length * serverIdArray.length;
      for (let index = 0; index < tokenArray.length; index++) {
        for (let i = 0; i < serverIdArray.length; i++) {
          try {
            const proxy = getProxy(proxyGroup["value"].split("\n"));
            const response = await serverLeaverAPI(
              tokenArray[index]?.split(":")[2],
              serverIdArray[i],
              proxy
            );
            if (response.status === 200 || response.status === 204) {
              counter++;
            }
          } catch (error) {
            console.log(
              "Something went wrong while trying to leave server",
              error.message
            );
          }
        }
      }
      if (counter === 0) {
        dispatch(
          updateTaskState({ id: obj.id, status: "Error", active: false })
        );
      } else if (counter < maxLoop) {
        dispatch(
          updateTaskState({ id: obj.id, status: "Completed", active: false })
        );
      } else {
        dispatch(
          updateTaskState({ id: obj.id, status: "Success", active: false })
        );
      }
    }
  };
  return apiCall;
};

export const useUserName = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    const { proxyGroup } = obj;
    let name = null;
    let counter = 0;
    if ("username" in obj) {
      name = obj.username;
    } else {
      const chance = new Chance();
      name = chance.name();
    }
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length;
    for (let index = 0; index < tokenArray.length; index++) {
      try {
        const proxy = getProxy(proxyGroup["value"].split("\n"));
        const response = await usernameChangerAPI(
          tokenArray[index]?.split(":")[2],
          tokenArray[index]?.split(":")[1],
          proxy,
          name
        );
        if (response.status === 200 || response.status === 204) {
          counter++;
        }
        sleep(2);
      } catch (error) {
        console.log(
          "Something went wrong while  to change user name",
          error.message
        );
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return apiCall;
};

export const useActivityChanger = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length;
    let counter = 0;
    for (let index = 0; index < tokenArray.length; index++) {
      try {
        const proxy = getProxy(proxyGroup["value"].split("\n"));
        const response = await activityChangerAPI(
          tokenArray[index]?.split(":")[2],
          obj.activityDetail,
          obj.emojiValue,
          obj.userStatus,
          proxy
        );
        if (response.status === 200 || response.status === 204) {
          counter++;
        }
      } catch (error) {
        console.log(
          "Something went wrong while changing activity",
          error.message
        );
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return apiCall;
};

export const useNickNameChanger = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const serverIdArray = obj.serverIDs?.split("\n");
    if (serverIdArray.length > 0) {
      const tokenArray = getTokenList(obj);
      const maxLoop = tokenArray.length * serverIdArray.length;
      let name = obj.nicknameGenerate.split("\n");
      for (let i = 0; i < serverIdArray.length; i++) {
        for (let index = 0; index < tokenArray.length; index++) {
          const proxy = getProxy(proxyGroup["value"].split("\n"));
          const response = await nicknameChangerAPI(
            tokenArray[index]?.split(":")[2],
            serverIdArray[i],
            name[index],
            proxy
          );
          if (response.status === 200 || response.status === 204) {
            counter++;
          }
        }
      }
      if (counter === 0) {
        dispatch(
          updateTaskState({ id: obj.id, status: "Error", active: false })
        );
      } else if (counter < maxLoop) {
        dispatch(
          updateTaskState({ id: obj.id, status: "Completed", active: false })
        );
      } else {
        dispatch(
          updateTaskState({ id: obj.id, status: "Success", active: false })
        );
      }
    }
  };
  return apiCall;
};

export const usePasswordChanger = () => {
  const dispatch = useDispatch();
  let arr = [];
  let user = [];
  const helper = (response, obj, index) => {
    let tempObj = { ...obj };
    let newPass = JSON.parse(response.config.data)["new_password"];
    let tempuser = response.data.username;
    arr.push(newPass);
    user.push(tempuser);
    if (index > 0) {
      arr = [...tempObj["newPass"].split("\n"), ...arr];
      user = [...tempObj["username"].split("\n"), ...user];
    }
    tempObj["newPass"] = arr.join("\n");
    tempObj["username"] = user.join("\n");
    tempObj["status"] = "Completed";
    dispatch(updatePasswordChangerStatus(tempObj));
  };

  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length;
    let newPass = obj.commonPassword;
    if (!newPass) {
      newPass = generateRandomPassword({
        lower: true,
        upper: true,
        num: true,
        sym: true,
        length: 18,
      });
    }
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const response = await passwordChangerAPI(
        tokenArray[index]?.split(":")[2],
        tokenArray[index]?.split(":")[1],
        newPass,
        proxy
      );
      if (response.status === 200 || response.status === 204) {
        helper(response, obj, index);
        counter++;
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return apiCall;
};

export const useTokeChecker = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length;
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const response = await tokenCheckerAPI(
        tokenArray[index]?.split(":")[2],
        proxy
      );
      if (response.status === 200 || response.status === 204) {
        counter++;
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return apiCall;
};

export const useTokenRetriever = () => {
  const dispatch = useDispatch();
  let arr = [];
  let user = [];
  let emailArr = [];
  const helper = (obj, apiResponse, tokenArr, index) => {
    let tempObj = { ...obj };
    let newToken = apiResponse.data.token;
    arr.push(newToken);
    user.push(tokenArr[1]);
    emailArr.push(tokenArr[0]);
    if (index > 0) {
      arr = [...tempObj["newToken"].split("\n"), ...arr];
      user = [...tempObj["newUsername"].split("\n"), ...user];
      emailArr = [...tempObj["email"].split("\n"), ...user];
    }
    tempObj["newToken"] = arr.join("\n");
    tempObj["newUsername"] = user.join("\n");
    tempObj["email"] = emailArr.join("\n");
    tempObj["status"] = "Completed";
    dispatch(updatePasswordChangerStatus(tempObj));
  };

  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length;
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const response = await tokenRetrieverAPI(
        tokenArray[index]?.split(":")[0],
        tokenArray[index]?.split(":")[1],
        proxy
      );
      if (response.status === 200 || response.status === 204) {
        helper(obj, response, tokenArray, index);
        counter++;
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return apiCall;
};

export const useAvatarChanger = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let randomImage;
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const maxLoop = tokenArray.length;
    const avatarAPI = obj.apiInfo;
    if (avatarAPI?.label === "Default API" || avatarAPI?.label === undefined) {
      randomImage = await generateRandomAvatar();
    } else {
      randomImage = await generateRandomAvatar(avatarAPI.value);
    }
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const response = await avatarChangerAPI(
        tokenArray[index]?.split(":")[2],
        randomImage,
        proxy
      );
      if (response.status === 200 || response.status === 204) {
        counter++;
      }
    }
    if (counter === 0) {
      dispatch(updateTaskState({ id: obj.id, status: "Error", active: false }));
    } else if (counter < maxLoop) {
      dispatch(
        updateTaskState({ id: obj.id, status: "Completed", active: false })
      );
    } else {
      dispatch(
        updateTaskState({ id: obj.id, status: "Success", active: false })
      );
    }
  };
  return apiCall;
};
