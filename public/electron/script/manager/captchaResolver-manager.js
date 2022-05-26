const CaptchaResolverProcess = require("../process/captchaResolver-process");

class CaptchaManager {
  constructor() {
    this.bots = {};
  }
  addCaptcha(data) {
    const {
      taskObj: { id },
    } = data;
    this.bots[id] = new CaptchaResolverProcess(data);
  }

  //   stopMonitor(id) {
  //     if (id in this.bots) {
  //       this.bots[id].stop();
  //       delete this.bots[id];
  //     }
  //   }
}

module.exports = new CaptchaManager();
// [electron] {
//   [electron]   proxy: {
//   [electron]     host: '157.245.23.89',
//   [electron]     port: '4343',
//   [electron]     auth: {
//   [electron]       username: '7iiz9d81wac5nechxqo772nbv6qdoo',
//   [electron]       password: 'UsO1yaDfm09I8ihf_country-UnitedStates_session-2a7imga'
// [electron]     }
// [electron]   },
// [electron]   inviteCode: 'fedora',
// [electron]   discordToken: 'OTUzNTUyNTQ3MzkyNjUxMjc1.YmkZhA.K299zN_qs88ECa5X1maaEbfi9Kg',
// [electron]   taskObj: {
// [electron]     proxyGroup: {
// [electron]       label: 'Working',
// [electron]       value: '157.245.23.89:4343:7iiz9d81wac5nechxqo772nbv6qdoo:UsO1yaDfm09I8ihf_country-UnitedStates_session-2a7imga',
// [electron]       id: 'b6d25df3-8762-4292-b691-fd24132270f8'
// [electron]     },
// [electron]     claimerGroup: {
// [electron]       label: 'vivek',
// [electron]       id: '1d864a27-4825-4504-80b7-1f1e24baf0bc',
// [electron]       value: 'vivekjoshi9557223031@gmail.com:donotopenmyid:OTUzNTUyNTQ3MzkyNjUxMjc1.YmkZhA.K299zN_qs88ECa5X1maaEbfi9Kg'
// [electron]     },
// [electron]     status: 'Idle',
// [electron]     createdAt: 'Wed, 25 May 2022 14:43:13 GMT',
// [electron]     changerType: 'massInviter',
// [electron]     active: false,
// [electron]     render: false,
// [electron]     delay: '5',
// [electron]     chromeUser: {
// [electron]       id: '1abzsgjhgh2klghxcvbnnbvbcv12ncv3vbcc1',
// [electron]       label: 'Default',
// [electron]       value: 'default'
// [electron]     },
// [electron]     emoji: false,
// [electron]     inviteCodes: 'fedora',
// [electron]     id: '8054c6eb-2f19-474c-a07a-2c50a2947f51'
// [electron]   },
// [electron]   sitekey: 'b2b02ab5-7dae-4d6f-830e-7b55634c888b',
// [electron]   clientKey: '75d69168e0ca0b805348daf231fc1f50'
// [electron] }
