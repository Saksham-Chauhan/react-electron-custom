import { useDispatch } from "react-redux";
import { directDiscordJoinAPI, generateRandomAvatar, getProxy } from "../api";
import {
  updatePasswordChangerStatus,
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
import { generateRandomPassword, getEncryptedToken, sleep } from "../helper";
import { sendWebhook } from "../features/logic/setting";
import { sendLogs } from "../helper/electron-bridge";
import { toastWarning } from "../toaster";

const tokenMsg = "Invalid format, Token not found in Discord Accounts";
const passMsg = "Invalid format, Password not found";
const emailMsg = "Invalid format, Email not found";
const getTokenList = (obj) => obj.claimerGroup["value"]?.split("\n");

export const useMassInviteJoiner = () => {
  const dispatch = useDispatch();
  const callApi = async (obj, setting, user, webhookList) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const inviteCodeList = obj.inviteCodes?.split("\n");
    const tokenArray = getTokenList(obj);
    for (let index = 0; index < tokenArray.length; index++) {
      await sleep(obj.delay);
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
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `${counter + 1}/${tokenArray.length}  Joined`,
                active: true,
              })
            );
            counter = counter + 1;
            const log = `Server joined successfully with token: ${getEncryptedToken(
              tokenArray[index]?.split(":")[2]
            )}`;
            sendLogs(log);
          } else {
            if ("captcha_key" in response?.response?.data)
              toastWarning("Captcha key error");
            else if (!code)
              toastWarning("Invalid format, Invit code not found");
            else if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
            else toastWarning(response.message);
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `${counter}/${tokenArray.length} Joined`,
                active: true,
              })
            );
            const log = `Unable to join server with token: ${getEncryptedToken(
              tokenArray[index]?.split(":")[2]
            )}, error message:${response.message}`;
            sendLogs(log);
          }
        } catch (error) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `Stopped`,
              active: false,
            })
          );
          const log = `Unable to join server with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}, error message:${error.message}`;
          sendLogs(log);
          console.log("Something went wrong while mass joiner", error.message);
        }
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return callApi;
};

export const useServerLeaver = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    let tracker = 0,
      flag = false;
    const { proxyGroup } = obj;
    const serverIdArray = obj.serverIDs?.split("\n");
    const tokenArray = getTokenList(obj);
    if (serverIdArray?.length !== undefined) {
      for (let index = 0; index < tokenArray.length; index++) {
        flag = false;
        await sleep(obj.delay);
        for (let i = 0; i < serverIdArray.length; i++) {
          try {
            const proxy = getProxy(proxyGroup["value"].split("\n"));
            const response = await serverLeaverAPI(
              tokenArray[index]?.split(":")[2],
              serverIdArray[i],
              proxy
            );
            if (response.status === 200 || response.status === 204) {
              flag = true;
              counter = counter + 1;
              const log = `Server leave successfully, token: ${getEncryptedToken(
                tokenArray[index]?.split(":")[2]
              )}`;
              sendLogs(log);
            } else {
              if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
              else toastWarning(response.message);
              dispatch(
                updateTaskState({
                  id: obj.id,
                  status: `${counter}/${tokenArray.length} Leaved`,
                  active: true,
                })
              );
              const log = `Unable to leave server, token: ${getEncryptedToken(
                tokenArray[index]?.split(":")[2]
              )},error:${response.message}`;
              sendLogs(log);
            }
          } catch (error) {
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `Stopped`,
                active: false,
              })
            );
            const log = `Unable to leave server, token: ${getEncryptedToken(
              tokenArray[index]?.split(":")[2]
            )},error:${error.message}`;
            sendLogs(log);
            console.log(
              "Something went wrong while trying to leave server",
              error.message
            );
          }
        }
        if (flag) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${tracker + 1}/${tokenArray.length} Leaved`,
              active: true,
            })
          );
          tracker = tracker + 1;
        }
      }
    } else toastWarning("Invalid format, Server ID not found");
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const useUserName = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
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
    for (let index = 0; index < tokenArray.length; index++) {
      await sleep(obj.delay);
      await await sleep(obj.delay);
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      try {
        const response = await usernameChangerAPI(
          tokenArray[index]?.split(":")[2],
          tokenArray[index]?.split(":")[1],
          proxy,
          name
        );
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter = counter + 1;
          const log = `Username changed successfully with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}`;
          sendLogs(log);
        } else {
          if (!tokenArray[index]?.split(":")[1]) toastWarning(passMsg);
          else if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
          else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          const log = `Unable to change username, token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )},error:${response.message}`;
          sendLogs(log);
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        const log = `Unable to change username, token: ${getEncryptedToken(
          tokenArray[index]?.split(":")[2]
        )},error:${e.message}`;
        sendLogs(log);
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const useActivityChanger = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    let counter = 0;
    for (let index = 0; index < tokenArray.length; index++) {
      await sleep(obj.delay);
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
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter = counter + 1;
          const log = `Status changed successfully with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}`;
          sendLogs(log);
        } else {
          if (!obj.activityDetail)
            toastWarning("Invalid format, Status detail not found");
          else if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
          else if (!obj.emojiValue)
            toastWarning("Invalid format, Emoji not found");
          else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          const log = `Unable to change status, token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )},error:${response.message}`;
          sendLogs(log);
        }
      } catch (error) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        const log = `Unable to change status, token: ${getEncryptedToken(
          tokenArray[index]?.split(":")[2]
        )},error:${error.message}`;
        sendLogs(log);
        console.log(
          "Something went wrong while changing activity",
          error.message
        );
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const useNickNameChanger = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    const tokenArray = getTokenList(obj);
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    let tracker = 0,
      flag = false;
    const { proxyGroup } = obj;
    const serverIdArray = obj.serverIDs?.split("\n");
    if (serverIdArray.length > 0) {
      const tokenArray = getTokenList(obj);
      let name = obj.nicknameGenerate.split("\n");
      for (let i = 0; i < serverIdArray.length; i++) {
        flag = false;
        for (let index = 0; index < tokenArray.length; index++) {
          await sleep(obj.delay);
          try {
            const proxy = getProxy(proxyGroup["value"].split("\n"));
            const response = await nicknameChangerAPI(
              tokenArray[index]?.split(":")[2],
              serverIdArray[i],
              name[index],
              proxy
            );
            if (response.status === 200 || response.status === 204) {
              flag = true;
              counter = counter + 1;
              const log = `Nickname changed successfully with token: ${getEncryptedToken(
                tokenArray[index]?.split(":")[2]
              )}`;
              sendLogs(log);
            } else {
              if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
              else toastWarning(response.message);
              dispatch(
                updateTaskState({
                  id: obj.id,
                  status: `${counter}/${tokenArray.length} Changed`,
                  active: true,
                })
              );
              const log = `Unable to change nickname, token: ${getEncryptedToken(
                tokenArray[index]?.split(":")[2]
              )},error${response.message}`;
              sendLogs(log);
            }
          } catch (e) {
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `Stopped`,
                active: false,
              })
            );
            const log = `Unable to change nickname, token: ${getEncryptedToken(
              tokenArray[index]?.split(":")[2]
            )},error${e.message}`;
            sendLogs(log);
          }
        }
        if (flag) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${tracker + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          tracker = tracker + 1;
        }
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const usePasswordChanger = () => {
  const dispatch = useDispatch();
  let arr = [];
  let user = [];
  let tracker = 0;
  let tempObj = {};
  const helper = (response, obj) => {
    tempObj = { ...obj };
    let newPass = JSON.parse(response.config.data)["new_password"];
    let tempuser = response.data.username;
    arr.push(newPass);
    user.push(tempuser);
    if (tracker > 0) {
      arr = [...tempObj["newPass"].split("\n"), ...arr];
      user = [...tempObj["username"].split("\n"), ...user];
    }
    tempObj["newPass"] = arr.join("\n");
    tempObj["username"] = user.join("\n");
    dispatch(updatePasswordChangerStatus(tempObj));
    tracker = tracker + 1;
  };

  const apiCall = async (obj, setting, user, webhookList) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
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
      await sleep(obj.delay);
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      try {
        const response = await passwordChangerAPI(
          tokenArray[index]?.split(":")[2],
          tokenArray[index]?.split(":")[1],
          newPass,
          proxy
        );
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter = counter + 1;
          helper(response, obj);
          const log = `Password changed successfully with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}`;
          sendLogs(log);
        } else {
          if (!tokenArray[index]?.split(":")[1])
            toastWarning("Invalid format, Password not found");
          else if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
          else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          const log = `Unable to change password, token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )},error:${response.message}`;
          sendLogs(log);
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        const log = `Unable to change password, token: ${getEncryptedToken(
          tokenArray[index]?.split(":")[2]
        )},error:${e.message}`;
        sendLogs(log);
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const useTokeChecker = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    for (let index = 0; index < tokenArray.length; index++) {
      await sleep(obj.delay);
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      try {
        const response = await tokenCheckerAPI(
          tokenArray[index]?.split(":")[2],
          proxy
        );
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Checked`,
              active: true,
            })
          );
          counter = counter + 1;
          const log = `Token checked successfully with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}`;
          sendLogs(log);
        } else {
          if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
          else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Checked`,
              active: true,
            })
          );
          const log = `Unable to check token, token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )},error:${response.message}`;
          sendLogs(log);
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        const log = `Unable to check token, token: ${getEncryptedToken(
          tokenArray[index]?.split(":")[2]
        )},error:${e.message}`;
        sendLogs(log);
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const useTokenRetriever = () => {
  const dispatch = useDispatch();
  let arr = [];
  let emailArr = [];
  let tempObj = {};
  let tracker = 0;
  const helper = (obj, apiResponse, tokenArr) => {
    let newToken = apiResponse.data.token;
    arr.push(newToken);
    emailArr.push(tokenArr.split(":")[0]);
    if (tracker > 0) {
      arr = [...tempObj["newToken"].split("\n"), ...arr];
      emailArr = [...tempObj["email"].split("\n"), ...emailArr];
    }
    tempObj["newToken"] = arr.join("\n");
    tempObj["email"] = emailArr.join("\n");
    console.log("updated", tempObj);
    dispatch(updatePasswordChangerStatus(tempObj));
    tracker = tracker + 1;
  };
  const apiCall = async (obj, setting, user, webhookList) => {
    const tokenArray = getTokenList(obj);
    tempObj = { ...obj };
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let counter = 0;
    const { proxyGroup } = obj;
    for (let index = 0; index < tokenArray.length; index++) {
      await sleep(obj.delay);
      await await sleep(obj.delay);
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      try {
        const response = await tokenRetrieverAPI(
          tokenArray[index]?.split(":")[0],
          tokenArray[index]?.split(":")[1],
          proxy
        );
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Retrieved`,
              active: true,
            })
          );
          counter = counter + 1;
          helper(obj, response, tokenArray[index]);
          const log = `Token Retrieve successfully with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}`;
          sendLogs(log);
        } else {
          if (!tokenArray[index]?.split(":")[0]) toastWarning(emailMsg);
          else if (!tokenArray[index]?.split(":")[1]) toastWarning(passMsg);
          else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Retrieved`,
              active: true,
            })
          );
          const log = `Unable to retrieve token, token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )},error:${response.message}`;
          sendLogs(log);
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        const log = `Unable to retrieve token, token: ${getEncryptedToken(
          tokenArray[index]?.split(":")[2]
        )},error:${e.message}`;
        sendLogs(log);
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};

export const useAvatarChanger = () => {
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    dispatch(updateTaskState({ id: obj.id, status: "Running", active: true }));
    let randomImage;
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const avatarAPI = obj.apiInfo;
    if (avatarAPI?.label === "Default API" || avatarAPI?.label === undefined) {
      randomImage = await generateRandomAvatar();
    } else {
      randomImage = await generateRandomAvatar(avatarAPI.value);
    }
    console.log("image", randomImage);
    for (let index = 0; index < tokenArray.length; index++) {
      await sleep(obj.delay);
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      try {
        const response = await avatarChangerAPI(
          tokenArray[index]?.split(":")[2],
          randomImage,
          proxy
        );
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter = counter + 1;
          const log = `Avatar changed successfully with token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )}`;
          sendLogs(log);
        } else {
          if (!tokenArray[index]?.split(":")[2]) toastWarning(tokenMsg);
          else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          const log = `Unable to change avatar, token: ${getEncryptedToken(
            tokenArray[index]?.split(":")[2]
          )},error:${response.message}`;
          sendLogs(log);
        }
      } catch (error) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        const log = `Unable to change avatar, token: ${getEncryptedToken(
          tokenArray[index]?.split(":")[2]
        )},error:${error.message}`;
        sendLogs(log);
      }
    }
    dispatch(
      updateTaskState({
        id: obj.id,
        active: false,
      })
    );
    sendWebhook(obj, "TASKS", obj.changerType, setting, user, webhookList, {
      success: counter,
      total: tokenArray.length,
    });
  };
  return apiCall;
};
