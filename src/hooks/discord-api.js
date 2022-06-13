import { useDispatch, useSelector } from "react-redux";
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
import { useCaptchaResolverMassJoiner } from "../helper/captcha-resolver/captcha-resolver";
import {
  fetchLoggedUserDetails,
  fetchWebhookListState,
  fetchWebhookSettingState,
} from "../features/counterSlice";

const tokenMsg = "Invalid format, Token not found in Discord Accounts";
const passMsg = "Invalid format, Password not found";
const emailMsg = "Invalid format, Email not found";
const captchaMsg = "Error after resolve captcha with token :";
const getTokenList = (obj) => obj.claimerGroup["value"]?.split("\n");

export const useMassInviteJoiner = () => {
  const setting = useSelector(fetchWebhookSettingState);
  const user = useSelector(fetchLoggedUserDetails);
  const webhookList = useSelector(fetchWebhookListState);
  const dispatch = useDispatch();
  const captchaResolver = useCaptchaResolverMassJoiner();
  const callApi = async (obj) => {
    let counter = 0;
    const { proxyGroup } = obj;
    const inviteCodeList = obj.inviteCodes?.split("\n");
    const tokenArray = getTokenList(obj);
    for (let index = 0; index < tokenArray.length; index++) {
      for (let i = 0; i < inviteCodeList.length; i++) {
        const proxy = getProxy(proxyGroup["value"].split("\n"));
        const inviteCode = inviteCodeList[i];
        if (!inviteCode) {
          toastWarning("Invalid format, Invite code not found");
          continue;
        } else if (!tokenArray[index]?.split(":")[2]) {
          toastWarning(tokenMsg);
          continue;
        }
        try {
          await sleep(obj.delay);
          const token = tokenArray[index]?.split(":")[2];
          const response = await directDiscordJoinAPI({
            proxy,
            inviteCode,
            token,
            settingObj: obj,
          });
          if (response.status === 200 || response.status === 204) {
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `${counter + 1}/${tokenArray.length}  Joined`,
              })
            );
            counter++;
            sendLogs(
              `Server joined successfully with token: ${getEncryptedToken(
                token
              )}`
            );
          } else if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            sendLogs(
              `Captcha error with token :${getEncryptedToken(
                token
              )} in Mass Joiner`
            );
            const args = {
              proxy,
              inviteCode,
              token,
              settingObj: obj,
              captchaData: response?.response?.data,
            };

            const res = await captchaResolver(directDiscordJoinAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}${getEncryptedToken(token)} in Mass Joiner`
              );
            }
          } else {
            toastWarning(response.message);
          }
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Joined`,
            })
          );
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
  const captchaResolver = useCaptchaResolverMassJoiner();
  const apiCall = async (obj, setting, user, webhookList) => {
    let counter = 0;
    let next_counter = 0,
      flag = false;
    const { proxyGroup } = obj;
    const serverIdArray = obj.serverIDs?.split("\n");
    const tokenArray = getTokenList(obj);
    if (serverIdArray?.length !== undefined) {
      for (let index = 0; index < tokenArray.length; index++) {
        const token = tokenArray[index]?.split(":")[2];
        flag = false;
        for (let i = 0; i < serverIdArray.length; i++) {
          try {
            const proxy = getProxy(proxyGroup["value"].split("\n"));
            await sleep(obj.delay);
            if (!token) {
              toastWarning(tokenMsg);
              continue;
            }
            const response = await serverLeaverAPI({
              token: token,
              guildId: serverIdArray[i],
              proxy,
            });
            if (response.status === 200 || response.status === 204) {
              flag = true;
              counter++;
              sendLogs(
                `Server leave successfully, token: ${getEncryptedToken(token)}`
              );
            } else {
              // TODO-> check response object
              if (
                typeof response?.response?.data === "object" &&
                response?.response?.data?.captcha_key
              ) {
                sendLogs(
                  `Captcha error with token:${getEncryptedToken(
                    token
                  )} in Server Leaver`
                );
                const args = {
                  token,
                  guildId: serverIdArray[i],
                  proxy,
                  captchaData: response?.response?.data,
                };
                const res = await captchaResolver(serverLeaverAPI, args);
                if (res.status !== 200 || res.status !== 204) {
                  sendLogs(
                    `${captchaMsg} ${getEncryptedToken(token)} in Server Leaver`
                  );
                }
              } else toastWarning(response.message);
              dispatch(
                updateTaskState({
                  id: obj.id,
                  status: `${counter}/${tokenArray.length} Leaved`,
                  active: true,
                })
              );
              sendLogs(
                `Unable to leave server, token: ${getEncryptedToken(
                  token
                )},error:${response.message}`
              );
            }
          } catch (error) {
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `Stopped`,
                active: false,
              })
            );
            sendLogs(
              `Unable to leave server, token: ${getEncryptedToken(
                token
              )},error:${error.message}`
            );
          }
        }
        if (flag) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${next_counter + 1}/${tokenArray.length} Leaved`,
              active: true,
            })
          );
          next_counter = next_counter + 1;
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
  const captchaResolver = useCaptchaResolverMassJoiner();
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
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
      const token = tokenArray[index]?.split(":")[2];
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      try {
        await sleep(obj.delay);
        if (!tokenArray[index]?.split(":")[1]) {
          toastWarning(passMsg);
          continue;
        } else if (!token) {
          toastWarning(tokenMsg);
          continue;
        }
        const response = await usernameChangerAPI({
          token: token,
          password: tokenArray[index]?.split(":")[1],
          proxy,
          username: name,
        });
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
            })
          );
          counter++;
          sendLogs(
            `Username changed successfully with token: ${getEncryptedToken(
              token
            )}`
          );
        } else {
          if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            sendLogs(
              `Captcha error with token :${getEncryptedToken(
                token
              )} in Username Changer`
            );
            const args = {
              token: token,
              password: tokenArray[index]?.split(":")[1],
              proxy,
              username: name,
            };

            const res = await captchaResolver(usernameChangerAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}${getEncryptedToken(token)} in Username Changer`
              );
            }
          } else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
            })
          );
          sendLogs(
            `Unable to change username, token: ${getEncryptedToken(
              token
            )},error:${response.message}`
          );
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        sendLogs(
          `Unable to change username, token: ${getEncryptedToken(
            token
          )},error:${e.message}`
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
// TODO REMOVE ALL CONSOLE
export const useActivityChanger = () => {
  const captchaResolver = useCaptchaResolverMassJoiner();
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    let counter = 0;
    for (let index = 0; index < tokenArray.length; index++) {
      const token = tokenArray[index]?.split(":")[2];
      try {
        const proxy = getProxy(proxyGroup["value"].split("\n"));
        if (!obj.activityDetails) {
          toastWarning("Invalid format, Status detail not found");
          continue;
        } else if (!token) {
          toastWarning(tokenMsg);
          continue;
        }
        await sleep(obj.delay);
        const response = await activityChangerAPI({
          token: token,
          message: obj.activityDetails,
          emojiValue: obj.emojiValue,
          userStatus: obj.userStatus,
          proxy,
        });
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter++;
          sendLogs(
            `Status changed successfully with token: ${getEncryptedToken(
              token
            )}`
          );
        } else {
          if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            sendLogs(
              `Captcha error with token :${getEncryptedToken(
                token
              )} in Status Changer`
            );
            const args = {
              token: token,
              message: obj.activityDetail,
              emojiValue: obj.emojiValue,
              userStatus: obj.userStatus,
              proxy,
            };
            const res = await captchaResolver(activityChangerAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}${getEncryptedToken(token)} in Activity Changer`
              );
            }
          } else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          sendLogs(
            `Unable to change status, token: ${getEncryptedToken(
              token
            )},error:${response.message}`
          );
        }
      } catch (error) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        sendLogs(
          `Unable to change status, token: ${getEncryptedToken(token)},error:${
            error.message
          }`
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
  const captchaResolver = useCaptchaResolverMassJoiner();
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    const tokenArray = getTokenList(obj);
    let counter = 0;
    let next_counter = 0,
      flag = false;
    const { proxyGroup } = obj;
    const serverIdArray = obj.serverIDs?.split("\n") || [];
    if (serverIdArray.length > 0) {
      const tokenArray = getTokenList(obj);
      const name = obj.nicknameGenerate?.split("\n");
      for (let i = 0; i < serverIdArray.length; i++) {
        flag = false;
        for (let index = 0; index < tokenArray.length; index++) {
          const token = tokenArray[index]?.split(":")[2];
          try {
            await sleep(obj.delay);
            const proxy = getProxy(proxyGroup["value"].split("\n"));
            if (!token) {
              toastWarning(tokenMsg);
              continue;
            }
            const response = await nicknameChangerAPI({
              token: token,
              guildId: serverIdArray[i],
              name: name[index],
              proxy,
            });
            if (response.status === 200 || response.status === 204) {
              flag = true;
              counter++;
              sendLogs(
                `Nickname changed successfully with token: ${getEncryptedToken(
                  token
                )}`
              );
            } else {
              if (
                typeof response?.response?.data === "object" &&
                response?.response?.data?.captcha_key
              ) {
                sendLogs(
                  `Captcha error with token :${getEncryptedToken(
                    token
                  )} in Nickname Changer`
                );
                const args = {
                  token: token,
                  guildId: serverIdArray[i],
                  name: name[index],
                  proxy,
                };
                console.log("captcha error");
                const res = await captchaResolver(nicknameChangerAPI, args);
                if (res.status !== 200 || res.status !== 204) {
                  sendLogs(
                    `${captchaMsg}${getEncryptedToken(
                      token
                    )} in Nickname Changer`
                  );
                }
              } else toastWarning(response.message);
              dispatch(
                updateTaskState({
                  id: obj.id,
                  status: `${counter}/${tokenArray.length} Changed`,
                  active: true,
                })
              );
              sendLogs(
                `Unable to change nickname, token: ${getEncryptedToken(
                  token
                )},error${response.message}`
              );
            }
          } catch (e) {
            dispatch(
              updateTaskState({
                id: obj.id,
                status: `Stopped`,
                active: false,
              })
            );
            sendLogs(
              `Unable to change nickname, token: ${getEncryptedToken(
                token
              )},error${e.message}`
            );
          }
        }
        if (flag) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${next_counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          next_counter = next_counter + 1;
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
  const captchaResolver = useCaptchaResolverMassJoiner();
  const dispatch = useDispatch();
  let arr = [];
  let user = [];
  let next_counter = 0;
  let tempObj = {};
  const helper = (response, obj) => {
    tempObj = { ...obj };
    let newPass = JSON.parse(response.config.data)["new_password"];
    let tempuser = response.data.username;
    arr.push(newPass);
    user.push(tempuser);
    if (next_counter > 0) {
      arr = [...tempObj["newPass"].split("\n"), ...arr];
      user = [...tempObj["username"].split("\n"), ...user];
    }
    tempObj["newPass"] = arr.join("\n");
    tempObj["username"] = user.join("\n");
    dispatch(updatePasswordChangerStatus(tempObj));
    next_counter = next_counter + 1;
  };

  const apiCall = async (obj, setting, user, webhookList) => {
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
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const token = tokenArray[index]?.split(":")[2];
      try {
        await sleep(obj.delay);
        if (!tokenArray[index]?.split(":")[1]) {
          toastWarning("Invalid format, Password not found");
          continue;
        } else if (!token) {
          toastWarning(tokenMsg);
          continue;
        }
        const response = await passwordChangerAPI({
          token: token,
          currentPassword: tokenArray[index]?.split(":")[1],
          newPassword: newPass,
          proxy,
        });
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter++;
          helper(response, obj);
          sendLogs(
            `Password changed successfully with token: ${getEncryptedToken(
              token
            )}`
          );
        } else {
          if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            const args = {
              token: token,
              currentPassword: tokenArray[index]?.split(":")[1],
              newPassword: newPass,
              proxy,
            };
            console.log("captcha error");
            const res = await captchaResolver(passwordChangerAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}:${getEncryptedToken(token)} in Password Changer`
              );
            }
          } else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          sendLogs(
            `Unable to change password, token: ${getEncryptedToken(
              token
            )},error:${response.message}`
          );
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        sendLogs(
          `Unable to change password, token: ${getEncryptedToken(
            token
          )},error:${e.message}`
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

export const useTokeChecker = () => {
  const dispatch = useDispatch();
  const captchaResolver = useCaptchaResolverMassJoiner();
  const apiCall = async (obj, setting, user, webhookList) => {
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const token = tokenArray[index]?.split(":")[2];
      try {
        await sleep(obj.delay);
        if (!token) {
          toastWarning(tokenMsg);
          continue;
        }
        const response = await tokenCheckerAPI({
          token: token,
          proxy,
        });
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Checked`,
              active: true,
            })
          );
          counter++;
          sendLogs(
            `Token checked successfully with token: ${getEncryptedToken(token)}`
          );
        } else {
          if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            sendLogs(
              `Captcha error with token :${getEncryptedToken(
                token
              )} in Token Checker`
            );
            const args = {
              token: token,
              proxy,
            };
            console.log("captcha error");
            const res = await captchaResolver(tokenCheckerAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}${getEncryptedToken(token)} in Token Checker`
              );
            }
          } else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Checked`,
              active: true,
            })
          );
          sendLogs(
            `Unable to check token, token: ${getEncryptedToken(token)},error:${
              response.message
            }`
          );
        }
      } catch (e) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        sendLogs(
          `Unable to check token, token: ${getEncryptedToken(token)},error:${
            e.message
          }`
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

export const useTokenRetriever = () => {
  const captchaResolver = useCaptchaResolverMassJoiner();
  const dispatch = useDispatch();
  let arr = [];
  let emailArr = [];
  let tempObj = {};
  let next_counter = 0;
  const helper = (apiResponse, tokenArr) => {
    console.log("in helper");
    let newToken = apiResponse.data.token;
    arr.push(newToken);
    emailArr.push(tokenArr.split(":")[0]);
    if (next_counter > 0) {
      arr = [...tempObj["newToken"].split("\n"), ...arr];
      emailArr = [...tempObj["email"].split("\n"), ...emailArr];
    }
    tempObj["newToken"] = arr.join("\n");
    tempObj["email"] = emailArr.join("\n");
    dispatch(updatePasswordChangerStatus(tempObj));
    next_counter = next_counter + 1;
  };
  const apiCall = async (obj, setting, user, webhookList) => {
    const tokenArray = getTokenList(obj);
    tempObj = { ...obj };
    let counter = 0;
    const { proxyGroup } = obj;
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const token = tokenArray[index]?.split(":")[2];
      try {
        await sleep(obj.delay);
        if (!tokenArray[index]?.split(":")[0]) {
          toastWarning(emailMsg);
          continue;
        } else if (!tokenArray[index]?.split(":")[1]) {
          toastWarning(passMsg);
          continue;
        }
        const response = await tokenRetrieverAPI({
          email: tokenArray[index]?.split(":")[0],
          password: tokenArray[index]?.split(":")[1],
          proxy,
        });
        if (response.status === 200 || response.status === 204) {
          console.log("in 200");
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Retrieved`,
              active: true,
            })
          );
          tempObj["status"] = `${counter + 1}/${tokenArray.length} Retrieved`;
          counter++;
          helper(response, tokenArray[index]);
          sendLogs(
            `Token Retrieve successfully with token: ${getEncryptedToken(
              token
            )}`
          );
        } else {
          if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            sendLogs(
              `Captcha error with token :${getEncryptedToken(
                token
              )} in Token Retriever`
            );
            const args = {
              proxy,
              discordToken: token,
              taskObj: obj,
              captchaData: response?.response?.data,
              user: tokenArray[index]?.split(":")[0],
              pass: tokenArray[index]?.split(":")[1],
            };
            const res = await captchaResolver(directDiscordJoinAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}${getEncryptedToken(token)} in Token Retriever`
              );
            }
          } else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Retrieved`,
              active: true,
            })
          );
          sendLogs(
            `Unable to retrieve token, token: ${getEncryptedToken(
              token
            )},error:${response.message}`
          );
        }
      } catch (e) {
        console.log(e);
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        sendLogs(
          `Unable to retrieve token, token: ${getEncryptedToken(token)},error:${
            e.message
          }`
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

export const useAvatarChanger = () => {
  const captchaResolver = useCaptchaResolverMassJoiner();
  const dispatch = useDispatch();
  const apiCall = async (obj, setting, user, webhookList) => {
    let randomImage;
    let counter = 0;
    const { proxyGroup } = obj;
    const tokenArray = getTokenList(obj);
    const avatarAPI = obj.apiInfo;
    if (obj.customImage) {
      randomImage = obj.customImage;
    } else if (
      avatarAPI?.label === "Default API" ||
      avatarAPI?.label === undefined
    ) {
      randomImage = await generateRandomAvatar();
    } else {
      randomImage = await generateRandomAvatar(avatarAPI.value);
    }
    for (let index = 0; index < tokenArray.length; index++) {
      const proxy = getProxy(proxyGroup["value"].split("\n"));
      const token = tokenArray[index]?.split(":")[2];
      try {
        await sleep(obj.delay);
        if (!token) {
          toastWarning(tokenMsg);
          continue;
        }
        const response = await avatarChangerAPI({
          token: token,
          image: randomImage,
          proxy,
        });
        if (response.status === 200 || response.status === 204) {
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter + 1}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          counter++;
          sendLogs(
            `Avatar changed successfully with token: ${getEncryptedToken(
              token
            )}`
          );
        } else {
          if (
            typeof response?.response?.data === "object" &&
            response?.response?.data?.captcha_key
          ) {
            sendLogs(
              `Captcha error with token :${getEncryptedToken(
                token
              )} in Avatar Changer`
            );
            const args = {
              token: token,
              image: randomImage,
              proxy,
            };
            console.log("captcha error");
            const res = await captchaResolver(avatarChangerAPI, args);
            if (res.status !== 200 || res.status !== 204) {
              sendLogs(
                `${captchaMsg}${getEncryptedToken(token)} in Avatar Changer`
              );
            }
          } else toastWarning(response.message);
          dispatch(
            updateTaskState({
              id: obj.id,
              status: `${counter}/${tokenArray.length} Changed`,
              active: true,
            })
          );
          sendLogs(
            `Unable to change avatar, token: ${getEncryptedToken(
              token
            )},error:${response.message}`
          );
        }
      } catch (error) {
        dispatch(
          updateTaskState({
            id: obj.id,
            status: `Stopped`,
            active: false,
          })
        );
        sendLogs(
          `Unable to change avatar, token: ${getEncryptedToken(token)},error:${
            error.message
          }`
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

export const useUpdateTaskStatus = () => {
  const dispatch = useDispatch();
  const updateStatus = (id, status, activeType) => {
    dispatch(updateTaskState({ id: id, status: status, active: activeType }));
  };
  return updateStatus;
};
