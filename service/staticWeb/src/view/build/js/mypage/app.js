(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // view/src/js/_setting/browserServerSetting.js
  var apiEndpoint = "/f";
  var labelList = {
    scopeBody: {
      global: {
        notification: {
          label: "\u3059\u3079\u3066\u306E\u901A\u77E5",
          summary: "\u3059\u3079\u3066\u306E\u30B5\u30FC\u30D3\u30B9\u306E\u901A\u77E5\u306B\u95A2\u3059\u308B\u6A29\u9650\u3067\u3059\u3002\u30ED\u30B0\u30A4\u30F3\u6642\u523B\u306A\u3069\u3092\u542B\u307F\u307E\u3059\u3002"
        }
      },
      auth: {
        emailAddress: {
          label: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
          summary: "\u30ED\u30B0\u30A4\u30F3\u306B\u4F7F\u7528\u3059\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306B\u95A2\u3059\u308B\u6A29\u9650\u3067\u3059\u3002\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u542B\u307F\u307E\u305B\u3093\u3002"
        },
        backupEmailAddress: {
          label: "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
          summary: "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306B\u95A2\u3059\u308B\u6A29\u9650\u3067\u3059\u3002\u30ED\u30B0\u30A4\u30F3\u306B\u4F7F\u7528\u3059\u308B\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u542B\u307F\u307E\u305B\u3093\u3002"
        },
        userName: {
          label: "\u30E6\u30FC\u30B6\u30FC\u540D",
          summary: "\u4E00\u822C\u516C\u958B\u3055\u308C\u3066\u3044\u308B\u30E6\u30FC\u30B6\u30FC\u306E\u540D\u524D\u3067\u3059\u3002"
        }
      },
      service: {
        serviceUserId: {
          label: "\u30E6\u30FC\u30B6\u30FCID",
          summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u306B\u63D0\u4F9B\u3059\u308B\u3001\u3042\u306A\u305F\u306E\u30A2\u30AB\u30A6\u30F3\u30C8\u306EID\u3067\u3059\u3002\u30B5\u30FC\u30D3\u30B9\u6BCE\u306B\u7570\u306A\u308A\u307E\u3059\u3002"
        },
        notification: {
          label: "\u30B5\u30FC\u30D3\u30B9\u5185\u901A\u77E5",
          summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u5185\u3067\u3001\u901A\u77E5\u6A5F\u80FD\u3092\u5229\u7528\u3059\u308B\u305F\u3081\u306E\u6A29\u9650\u3067\u3059\u3002"
        },
        json_v1: {
          label: "\u30C6\u30AD\u30B9\u30C8",
          summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u3067\u3001\u3042\u306A\u305F\u304C\u30C7\u30FC\u30BF\u3092\u4FDD\u5B58\u3067\u304D\u307E\u3059\u3002"
        },
        file_v1: {
          label: "\u30D5\u30A1\u30A4\u30EB",
          summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u3067\u3001\u3042\u306A\u305F\u304C\u30C7\u30FC\u30BF\u3092\u4FDD\u5B58\u3067\u304D\u307E\u3059\u3002"
        },
        chatgpt: {
          label: "ChatGPT",
          summary: "\u9023\u643A\u3059\u308B\u30B5\u30FC\u30D3\u30B9\u3067\u3001ChatGPT\u3092\u5229\u7528\u3059\u308B\u305F\u3081\u306E\u6A29\u9650\u3067\u3059\u3002"
        }
      }
    },
    scopeOperation: {
      operation: {
        read: "\u53D6\u5F97",
        write: "\u4FDD\u5B58",
        append: "\u8FFD\u8A18"
      },
      prefix: {
        isRequired: "\u5FC5\u9808"
      }
    },
    error: {
      undefined: "error",
      handle_credential_credential: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u307E\u305F\u306F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u9055\u3044\u307E\u3059\u3002",
      handle_user_add_register: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u306F\u65E2\u306B\u767B\u9332\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
      handle_xlogin_code_session: "\u30BB\u30C3\u30B7\u30E7\u30F3\u304C\u4E0D\u6B63\u3067\u3059\u3002"
    }
  };
  var statusList = {
    OK: 1,
    SUCCESS: 100,
    LOGIN_SUCCESS: 101,
    INVALID: 1e3,
    NOT_ENOUGH_PARAM: 1001,
    INVALID_SESSION: 1002,
    INVALID_CREDENTIAL: 1003,
    API_ERROR: 1100,
    INVALID_OIDC_ISSUER: 1101,
    NOT_FOUND: 1200,
    SERVER_ERROR: 1300
  };
  var userReadableDateFormat = {
    full: "YYYY/MM/DD hh:mm:ss",
    day: "YYYY/MM/DD",
    hourMinute: "hh:mm",
    time: "hh:mm:ss"
  };
  var setting = {
    apiEndpoint,
    labelList,
    statusList,
    userReadableDateFormat
  };
  var getList = /* @__PURE__ */ __name((...keyList) => {
    const constantList = keyList.reduce((prev, key) => {
      let value = setting;
      for (const keySplit of key.split(".")) {
        value = value[keySplit];
      }
      prev[key.slice(key.lastIndexOf(".") + 1)] = value;
      return prev;
    }, {});
    for (const key of keyList) {
      if (constantList[key.slice(key.lastIndexOf(".") + 1)] === void 0) {
        throw new Error(`[error] undefined setting constant: ${key}`);
      }
    }
    return constantList;
  }, "getList");
  var getValue = /* @__PURE__ */ __name((key) => {
    let value = setting;
    for (const keySplit of key.split(".")) {
      value = value[keySplit];
    }
    return value;
  }, "getValue");
  var browserServerSetting_default = {
    getList,
    getValue
  };

  // view/src/js/_setting/index.js
  var setting2 = {};
  var getList2 = /* @__PURE__ */ __name((...keyList) => {
    const constantList = keyList.reduce((prev, key) => {
      let value = setting2;
      for (const keySplit of key.split(".")) {
        value = value[keySplit];
      }
      prev[key.slice(key.lastIndexOf(".") + 1)] = value;
      return prev;
    }, {});
    for (const key of keyList) {
      if (constantList[key.slice(key.lastIndexOf(".") + 1)] === void 0) {
        throw new Error(`[error] undefined setting constant: ${key}`);
      }
    }
    return constantList;
  }, "getList");
  var setting_default = {
    getList: getList2,
    browserServerSetting: browserServerSetting_default
  };

  // view/src/js/_lib/index.js
  var lib_exports2 = {};
  __export(lib_exports2, {
    common: () => common,
    getCaller: () => getCaller,
    monkeyPatch: () => monkeyPatch,
    redirect: () => redirect,
    xdevkit: () => xdevkit
  });

  // view/src/js/_lib/_xdevkit/index.js
  var xdevkit_exports = {};
  __export(xdevkit_exports, {
    lib: () => lib,
    output: () => output
  });

  // view/src/js/_lib/_xdevkit/lib.js
  var lib_exports = {};
  __export(lib_exports, {
    getRandomStr: () => getRandomStr,
    getSearchQuery: () => getSearchQuery
  });
  var getRandomStr = /* @__PURE__ */ __name((len) => {
    return btoa(crypto.getRandomValues(new Uint8Array(len))).slice(0, len);
  }, "getRandomStr");
  var getSearchQuery = /* @__PURE__ */ __name(() => {
    const searchQuery = {};
    window.location.search.replace(/^\?/, "").split("&").forEach((row) => {
      const kv = row.split("=");
      const [key, value] = kv;
      searchQuery[key] = value;
    });
    return searchQuery;
  }, "getSearchQuery");

  // view/src/js/_lib/_xdevkit/output.js
  var output_exports = {};
  __export(output_exports, {
    applyElmList: () => applyElmList,
    createTabMenuContainer: () => createTabMenuContainer,
    getErrorModalElmAndSetter: () => getErrorModalElmAndSetter,
    reloadXloginLoginBtn: () => reloadXloginLoginBtn,
    showModal: () => showModal,
    showTabButton: () => showTabButton,
    switchLoading: () => switchLoading
  });
  var applyElmList = /* @__PURE__ */ __name((query, f, parent = document) => {
    Object.values(parent.querySelectorAll(query)).forEach((elm) => {
      f(elm);
    });
  }, "applyElmList");
  var _closeModal = /* @__PURE__ */ __name(() => {
    applyElmList('[data-id="modal"], #modalBackground', (elm) => {
      elm.classList.add("hidden");
    });
  }, "_closeModal");
  var showModal = /* @__PURE__ */ __name((modalElm, cancelButtonIsVisible = false) => {
    return new Promise((resolve) => {
      if (modalElm.id === "modalTemplate") {
        modalElm.id = "";
      }
      document.body.appendChild(modalElm);
      _closeModal();
      setTimeout(() => {
        applyElmList('[data-id="modalClose"], [data-id="modalCancelButton"]', (elm) => {
          elm.onclick = () => {
            _closeModal();
            return resolve(false);
          };
        }, document);
        if (cancelButtonIsVisible) {
          modalElm.querySelector('[data-id="modalCancelButton"]').classList.remove("hidden");
        } else {
          modalElm.querySelector('[data-id="modalCancelButton"]').classList.add("hidden");
        }
        modalElm.querySelector('[data-id="modalConfirmButton"]').onclick = () => {
          _closeModal();
          return resolve(true);
        };
        modalElm.classList.remove("hidden");
        document.querySelector("#modalBackground").classList.remove("hidden");
        modalElm.querySelector('[data-id="modalContent"]').scrollTop = 0;
        modalElm.querySelector('[data-id="modalCard"]').onclick = (e) => {
          e.stopPropagation();
        };
        modalElm.onclick = (e) => {
          e.stopPropagation();
          _closeModal();
          return resolve(false);
        };
      }, 100);
    });
  }, "showModal");
  var getErrorModalElmAndSetter = /* @__PURE__ */ __name(() => {
    const modalTemplateElm = document.querySelector("#modalTemplate");
    const modalElm = modalTemplateElm.cloneNode(true);
    const modalTitleElm = modalElm.querySelector('[data-id="modalTitle"]');
    modalTitleElm.innerText = "\u30A8\u30E9\u30FC";
    const labelP = document.createElement("p");
    labelP.innerText = "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002";
    modalElm.querySelector('[data-id="modalContent"]').appendChild(labelP);
    const setContent = /* @__PURE__ */ __name((textStr, errorLabelList = null, title = "\u30A8\u30E9\u30FC") => {
      if (errorLabelList) {
        labelP.innerText = errorLabelList[textStr] || textStr;
      } else {
        labelP.innerText = textStr;
      }
      modalTitleElm.innerText = title;
    }, "setContent");
    return { modalElm, setContent };
  }, "getErrorModalElmAndSetter");
  var createTabMenuContainer = /* @__PURE__ */ __name(() => {
    const tabMenuContainerElm = document.querySelector("#tabMenuContainerTemplate").cloneNode(true);
    tabMenuContainerElm.id = "";
    tabMenuContainerElm.classList.remove("hidden");
    return tabMenuContainerElm;
  }, "createTabMenuContainer");
  var _showTabContainer = /* @__PURE__ */ __name(({ activeTabContainerId, tabList }) => {
    Object.keys(tabList).forEach((tabContainerId) => {
      const tabContainerElm2 = document.querySelector(`#${tabContainerId}`);
      tabContainerElm2.classList.add("hidden");
    });
    const tabContainerElm = document.querySelector(`#${activeTabContainerId}`);
    tabContainerElm.classList.remove("hidden");
  }, "_showTabContainer");
  var showTabButton = /* @__PURE__ */ __name(({ tabMenuContainerElm, tabList, activeTabContainerId }) => {
    const getOnClickTabButton = /* @__PURE__ */ __name(({ newActiveTabContainerId }) => {
      return (e) => {
        if (e) {
          e.preventDefault();
        }
        showTabButton({ tabMenuContainerElm, tabList, activeTabContainerId: newActiveTabContainerId });
        _showTabContainer({ tabList, activeTabContainerId: newActiveTabContainerId });
      };
    }, "getOnClickTabButton");
    tabMenuContainerElm.clearChildren();
    Object.entries(tabList).forEach(([tabContainerId, value]) => {
      let tabItemElm = null;
      if (tabContainerId === activeTabContainerId) {
        tabItemElm = document.querySelector("#tabActiveItemTemplate").cloneNode(true);
      } else {
        tabItemElm = document.querySelector("#tabItemTemplate").cloneNode(true);
      }
      tabItemElm.id = "";
      tabItemElm.classList.remove("hidden");
      tabItemElm.children[0].innerText = value;
      tabItemElm.children[0].onclick = getOnClickTabButton({ newActiveTabContainerId: tabContainerId });
      tabMenuContainerElm.appendChild(tabItemElm);
      if (tabContainerId === activeTabContainerId) {
        _showTabContainer({ tabList, activeTabContainerId: tabContainerId });
      }
    });
  }, "showTabButton");
  var switchLoading = /* @__PURE__ */ __name((isVisible) => {
    const loadingElm = document.querySelector("#loading");
    if (!loadingElm) {
      return;
    }
    if (isVisible) {
      loadingElm.classList.remove("hidden");
    } else {
      loadingElm.classList.add("hidden");
    }
  }, "switchLoading");
  var reloadXloginLoginBtn = /* @__PURE__ */ __name((clientId) => {
    const getOnClickXloginButtonHandler = /* @__PURE__ */ __name(() => {
      const handler = /* @__PURE__ */ __name((elm) => {
        const { permission } = elm.dataset;
        let queryPart = "";
        if (permission !== void 0) {
          queryPart += `&requestScope=${permission.replace(/\$CLIENT_ID/g, clientId)}`;
        }
        return () => {
          window.location.href = `/f/xlogin/connect?redirectAfterAuth=/mypage${queryPart}`;
        };
      }, "handler");
      return handler;
    }, "getOnClickXloginButtonHandler");
    const setOnClickXloginButton = /* @__PURE__ */ __name(({ onClickXloginButtonHandler: onClickXloginButtonHandler2 }) => {
      document.querySelectorAll('[data-id="xloginLoginBtn"]').forEach((elm) => {
        elm.onclick = onClickXloginButtonHandler2(elm);
      });
    }, "setOnClickXloginButton");
    const onClickXloginButtonHandler = getOnClickXloginButtonHandler();
    setOnClickXloginButton({ onClickXloginButtonHandler });
  }, "reloadXloginLoginBtn");

  // view/src/js/_lib/_xdevkit/index.js
  var lib = lib_exports;
  var output = output_exports;

  // view/src/js/_lib/_common/index.js
  var common_exports = {};
  __export(common_exports, {
    input: () => input,
    output: () => output2
  });

  // view/src/js/_lib/_common/output.js
  var output_exports2 = {};
  __export(output_exports2, {
    postFormRequest: () => postFormRequest,
    postRequest: () => postRequest,
    setOnClickNavManu: () => setOnClickNavManu,
    showNotification: () => showNotification
  });
  var _request = /* @__PURE__ */ __name((url, opt) => {
    return fetch(url, opt).then((res) => {
      if (res.error || !res.body || !res.json) {
        return null;
      }
      return res.json();
    }).catch((e) => {
      console.error("[fatal] error @postRequest:", e);
      return null;
    });
  }, "_request");
  var postRequest = /* @__PURE__ */ __name((url, param = {}) => {
    const opt = {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 30 * 1e3
    };
    if (param) {
      opt.body = JSON.stringify(param);
    }
    return _request(url, opt);
  }, "postRequest");
  var postFormRequest = /* @__PURE__ */ __name((url, formData) => {
    const opt = {
      method: "POST",
      body: formData
    };
    return _request(url, opt);
  }, "postFormRequest");
  var setOnClickNavManu = /* @__PURE__ */ __name(() => {
    const toggleElm = document.querySelector("#commonNavToggle");
    const navContentElm = document.querySelector("#commonNavContent");
    toggleElm.onclick = () => {
      if ([...navContentElm.classList.values()].indexOf("hidden") >= 0) {
        navContentElm.classList.remove("hidden");
      } else {
        navContentElm.classList.add("hidden");
      }
    };
  }, "setOnClickNavManu");
  var notificationIsVisible = false;
  var showNotification = /* @__PURE__ */ __name(async (apiEndpoint2, showModal2, getRequest2) => {
    if (notificationIsVisible) {
      return;
    }
    notificationIsVisible = true;
    const durationShow = 0.5;
    const durationHide = 0.2;
    const resultFetchGlobalNotification = await getRequest2(`${apiEndpoint2}/notification/list`);
    const notificationContainerElm = document.querySelector("#notificationContainer");
    notificationContainerElm.clearChildren();
    const notificationTemplateElm = document.querySelector("#notificationTemplate");
    const notificationList = Object.values(resultFetchGlobalNotification?.result?.notificationList || {}).reverse();
    notificationList.forEach((row, i) => {
      const notificationElm = notificationTemplateElm.cloneNode(true);
      notificationElm.classList.remove("hidden");
      notificationElm.querySelector('[data-id="subject"]').innerText = row.subject;
      notificationElm.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const modalTemplateElm = document.querySelector("#modalTemplate");
        const modalElm = modalTemplateElm.cloneNode(true);
        modalElm.classList.remove("hidden");
        modalElm.querySelector('[data-id="modalTitle"]').innerText = row.subject;
        modalElm.querySelector('[data-id="modalContent"]').appendChild(document.createTextNode(row.detail));
        showModal2(modalElm);
      };
      setTimeout(() => {
        notificationElm.style.transitionDuration = `${durationShow}s`;
        notificationElm.style.opacity = 0;
        notificationContainerElm.appendChild(notificationElm);
        setTimeout(() => {
          notificationElm.style.opacity = 1;
        }, 100);
      }, durationShow * i * 1e3);
      setTimeout(() => {
        notificationElm.style.transitionDuration = `${durationHide}s`;
        notificationElm.style.opacity = 0;
      }, durationShow * notificationList.length * 1e3 + 3 * 1e3 + durationHide * i * 1e3);
    });
    setTimeout(() => {
      notificationContainerElm.clearChildren();
      notificationIsVisible = false;
    }, (durationShow + durationHide) * notificationList.length * 1e3 + 3 * 1e3);
    const notificationIdList = Object.keys(resultFetchGlobalNotification?.result?.notificationList || {});
    if (notificationIdList.length === 0) {
      return;
    }
    const param = { notificationIdList };
    await postRequest(`${apiEndpoint2}/notification/open`, param);
  }, "showNotification");

  // view/src/js/_lib/_common/input.js
  var input_exports = {};
  __export(input_exports, {
    fetchSplitPermissionList: () => fetchSplitPermissionList,
    getRequest: () => getRequest
  });
  var getRequest = /* @__PURE__ */ __name((_url, param = {}) => {
    const query = param && Object.keys(param).map((key) => {
      return `${key}=${param[key]}`;
    }).join("&");
    const url = query ? `${_url}?${query}` : _url;
    const opt = {
      method: "GET",
      credentials: "same-origin",
      timeout: 30 * 1e3
    };
    return fetch(url, opt).then((res) => {
      if (res.error || !res.body || !res.json) {
        return null;
      }
      return res.json();
    }).then((json) => {
      console.log({ _url, json });
      return json;
    }).catch((e) => {
      console.error("[fatal] error @getRequest:", e);
      return null;
    });
  }, "getRequest");
  var fetchSplitPermissionList = /* @__PURE__ */ __name((apiEndpoint2) => {
    const url = `${apiEndpoint2}/session/splitPermissionList`;
    return getRequest(url);
  }, "fetchSplitPermissionList");

  // view/src/js/_lib/_common/index.js
  var output2 = output_exports2;
  var input = input_exports;

  // view/src/js/_lib/index.js
  var xdevkit = xdevkit_exports;
  var common = common_exports;
  var getCaller = /* @__PURE__ */ __name(() => {
    const callerInfo = new Error().stack.replace(/^Error\n.*\n.*\n/, "");
    return callerInfo;
  }, "getCaller");
  var monkeyPatch = /* @__PURE__ */ __name(() => {
    if (typeof Element.prototype.clearChildren === "undefined") {
      Object.defineProperty(Element.prototype, "clearChildren", {
        configurable: true,
        enumerable: false,
        value() {
          while (this.firstChild) {
            this.removeChild(this.lastChild);
          }
        }
      });
    }
    if (typeof window.argNamed === "undefined") {
      window.argNamed = (obj) => {
        const flattened = {};
        Object.keys(obj).forEach((key) => {
          if (Array.isArray(obj[key])) {
            Object.assign(flattened, obj[key].reduce((prev, curr) => {
              if (typeof curr === "undefined") {
                throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}
===== maybe you need make func exported like  module.exports = { func, } =====`);
              } else if (typeof curr === "function") {
                prev[curr.name] = curr;
              } else {
                throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`);
              }
              return prev;
            }, {}));
          } else if (typeof obj[key] === "object" && obj[key] !== null) {
            Object.assign(flattened, obj[key]);
          } else {
            flattened[key] = obj[key];
          }
        });
        return flattened;
      };
    }
  }, "monkeyPatch");
  var redirect = /* @__PURE__ */ __name((response) => {
    if (response && response.redirect) {
      window.location.href = response.redirect;
    }
  }, "redirect");

  // view/src/js/mypage/core.js
  var core_exports = {};
  __export(core_exports, {
    _: () => _,
    showUploadedImg: () => showUploadedImg
  });
  var showUploadedImg = /* @__PURE__ */ __name(async ({ fetchUploadedFileList, loadUploadedImg }) => {
    const fileListResult = await fetchUploadedFileList();
    console.log({ debug: true, fileListResult });
    if (!fileListResult || !fileListResult.result || !fileListResult.result.fileList || !fileListResult.result.fileList[0]) {
      loadUploadedImg({ fileId: null });
      return;
    }
    const { fileLabel } = fileListResult.result.fileList[0];
    loadUploadedImg({ fileLabel });
  }, "showUploadedImg");
  var _ = {};

  // view/src/js/mypage/input.js
  var input_exports2 = {};
  __export(input_exports2, {
    default: () => input_default,
    fetchMessage: () => fetchMessage,
    fetchUserProfile: () => fetchUserProfile,
    getBackupEmailAddress: () => getBackupEmailAddress,
    getFetchUploadedFileList: () => getFetchUploadedFileList
  });
  var fetchUserProfile = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, getRequest: getRequest2 }) => {
    const url = `${apiEndpoint2}/user/profile`;
    return getRequest2(url);
  }, "fetchUserProfile");
  var fetchMessage = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, getRequest: getRequest2 }) => {
    const url = `${apiEndpoint2}/message/content`;
    return getRequest2(url);
  }, "fetchMessage");
  var getBackupEmailAddress = /* @__PURE__ */ __name(({ userInfoResult }) => {
    const backupEmailAddress = userInfoResult?.userInfo?.public?.["auth:backupEmailAddress"];
    return backupEmailAddress || "";
  }, "getBackupEmailAddress");
  var getFetchUploadedFileList = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, getRequest: getRequest2 }) => {
    return () => {
      const url = `${apiEndpoint2}/file/list`;
      return getRequest2(url);
    };
  }, "getFetchUploadedFileList");
  var input_default = {};

  // view/src/js/mypage/action.js
  var action_exports = {};
  __export(action_exports, {
    default: () => action_default,
    getOnClickAddTimerButton: () => getOnClickAddTimerButton,
    getOnClickDeleteMessageButton: () => getOnClickDeleteMessageButton,
    getOnClickSaveMessageButton: () => getOnClickSaveMessageButton,
    getOnSubmitBackupEmailAddress: () => getOnSubmitBackupEmailAddress,
    getOnSubmitUploadForm: () => getOnSubmitUploadForm
  });
  var getOnClickAddTimerButton = /* @__PURE__ */ __name(({ addTimer }) => {
    return () => {
      addTimer();
    };
  }, "getOnClickAddTimerButton");
  var getOnClickSaveMessageButton = /* @__PURE__ */ __name(({ saveMessage }) => {
    return () => {
      saveMessage();
    };
  }, "getOnClickSaveMessageButton");
  var getOnClickDeleteMessageButton = /* @__PURE__ */ __name(({ deleteMessage }) => {
    return () => {
      deleteMessage();
    };
  }, "getOnClickDeleteMessageButton");
  var getOnSubmitBackupEmailAddress = /* @__PURE__ */ __name(({ saveBackupEmailAddress }) => {
    return () => {
      saveBackupEmailAddress();
    };
  }, "getOnSubmitBackupEmailAddress");
  var getOnSubmitUploadForm = /* @__PURE__ */ __name(({ uploadFile }) => {
    return () => {
      uploadFile();
    };
  }, "getOnSubmitUploadForm");
  var action_default = {};

  // view/src/js/mypage/output.js
  var output_exports3 = {};
  __export(output_exports3, {
    addTabMenuContainer: () => addTabMenuContainer,
    getAddTimer: () => getAddTimer,
    getDeleteMessage: () => getDeleteMessage,
    getLoadUploadedImg: () => getLoadUploadedImg,
    getSaveBackupEmailAddress: () => getSaveBackupEmailAddress,
    getSaveMessage: () => getSaveMessage,
    getUploadFile: () => getUploadFile,
    setOnClickAddTimerButton: () => setOnClickAddTimerButton,
    setOnClickDeleteMessageButton: () => setOnClickDeleteMessageButton,
    setOnClickSaveMessageButton: () => setOnClickSaveMessageButton,
    setOnSubmitBackupEmailAddress: () => setOnSubmitBackupEmailAddress,
    setOnSubmitUploadForm: () => setOnSubmitUploadForm,
    showBackupEmailAddress: () => showBackupEmailAddress,
    showBackupEmailAddressForm: () => showBackupEmailAddressForm,
    showEditor: () => showEditor,
    showMessage: () => showMessage,
    showUploadForm: () => showUploadForm,
    showUserProfile: () => showUserProfile
  });
  var showUserProfile = /* @__PURE__ */ __name(({ userInfoResult, applyElmList: applyElmList2 }) => {
    const { userInfo } = userInfoResult;
    Object.entries(userInfo?.public || {}).forEach(([key, value]) => {
      applyElmList2(`[data-var='${key}']`, (elm) => {
        elm.clearChildren();
        elm.appendChild(document.createTextNode(value));
      });
    });
  }, "showUserProfile");
  var getAddTimer = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, postRequest: postRequest2 }) => {
    const url = `${apiEndpoint2}/timer/add`;
    return () => {
      return postRequest2(url);
    };
  }, "getAddTimer");
  var getSaveMessage = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, postRequest: postRequest2 }) => {
    const url = `${apiEndpoint2}/message/save`;
    return () => {
      const messageContentElm = document.querySelector("#messageContent");
      const param = { message: messageContentElm.value };
      return postRequest2(url, param);
    };
  }, "getSaveMessage");
  var getDeleteMessage = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, postRequest: postRequest2 }) => {
    const url = `${apiEndpoint2}/message/delete`;
    return () => {
      const param = {};
      return postRequest2(url, param);
    };
  }, "getDeleteMessage");
  var getSaveBackupEmailAddress = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, postRequest: postRequest2 }) => {
    const url = `${apiEndpoint2}/backupEmailAddress/save`;
    return () => {
      const backupEmailAddressInputElm = document.querySelector("#backupEmailAddressInput");
      const param = { backupEmailAddress: backupEmailAddressInputElm.value };
      return postRequest2(url, param);
    };
  }, "getSaveBackupEmailAddress");
  var getUploadFile = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2, postFormRequest: postFormRequest2 }) => {
    const url = `${apiEndpoint2}/form/save`;
    return () => {
      const profileImageInputElm = document.querySelector("#profileImageInput");
      const file = profileImageInputElm.files[0];
      const formData = new FormData();
      formData.append("file", file);
      return postFormRequest2(url, formData);
    };
  }, "getUploadFile");
  var setOnClickAddTimerButton = /* @__PURE__ */ __name(({ onClickAddTimerButton }) => {
    const addTimerBtn = document.querySelector("#addTimerBtn");
    addTimerBtn.onclick = (e) => {
      e.preventDefault();
      onClickAddTimerButton();
    };
  }, "setOnClickAddTimerButton");
  var setOnClickSaveMessageButton = /* @__PURE__ */ __name(({ onClickSaveMessageButton }) => {
    const saveMessageBtn = document.querySelector("#saveMessageBtn");
    saveMessageBtn.onclick = (e) => {
      e.preventDefault();
      onClickSaveMessageButton();
    };
  }, "setOnClickSaveMessageButton");
  var setOnClickDeleteMessageButton = /* @__PURE__ */ __name(({ onClickDeleteMessageButton }) => {
    const deleteMessageBtn = document.querySelector("#deleteMessageBtn");
    deleteMessageBtn.onclick = (e) => {
      e.preventDefault();
      onClickDeleteMessageButton();
    };
  }, "setOnClickDeleteMessageButton");
  var setOnSubmitBackupEmailAddress = /* @__PURE__ */ __name(({ onSubmitBackupEmailAddress }) => {
    const backupEmailAddressFormElm = document.querySelector("#backupEmailAddressForm");
    backupEmailAddressFormElm.onsubmit = (e) => {
      e.preventDefault();
      onSubmitBackupEmailAddress();
    };
  }, "setOnSubmitBackupEmailAddress");
  var setOnSubmitUploadForm = /* @__PURE__ */ __name(({ onSubmitUploadForm }) => {
    const uploadProfileFormElm = document.querySelector("#uploadProfileForm");
    uploadProfileFormElm.onsubmit = (e) => {
      e.preventDefault();
      onSubmitUploadForm();
    };
  }, "setOnSubmitUploadForm");
  var showBackupEmailAddress = /* @__PURE__ */ __name(({ backupEmailAddress }) => {
    const backupEmailAddressInputElm = document.querySelector("#backupEmailAddressInput");
    backupEmailAddressInputElm.value = backupEmailAddress;
  }, "showBackupEmailAddress");
  var getLoadUploadedImg = /* @__PURE__ */ __name(({ apiEndpoint: apiEndpoint2 }) => {
    return ({ fileLabel }) => {
      const imgElm = document.querySelector("#uploadedImg");
      if (!imgElm) {
        return;
      }
      let filePath = "/img/profile.png";
      if (fileLabel) {
        filePath = `${apiEndpoint2}/file/content?fileLabel=${fileLabel}`;
      }
      imgElm.setAttribute("src", filePath);
    };
  }, "getLoadUploadedImg");
  var showMessage = /* @__PURE__ */ __name(({ messageResult }) => {
    document.querySelector("#messageContent").value = messageResult.result.jsonContent;
  }, "showMessage");
  var showEditor = /* @__PURE__ */ __name(({ splitPermissionListResult }) => {
    const { splitPermissionList, clientId } = splitPermissionListResult.result;
    if (splitPermissionList.optional[`rw:${clientId}:json_v1`]) {
      document.querySelector("#editorContainer").classList.remove("hidden");
    } else {
      document.querySelector("#filePermissionRequestContainer").classList.remove("hidden");
    }
  }, "showEditor");
  var showBackupEmailAddressForm = /* @__PURE__ */ __name(({ splitPermissionListResult }) => {
    const { splitPermissionList } = splitPermissionListResult.result;
    if (splitPermissionList.optional["rw:auth:backupEmailAddress"]) {
      document.querySelector("#backupEmailAddressForm").classList.remove("hidden");
    } else {
      document.querySelector("#backupEmailAddressPermissionRequestContainer").classList.remove("hidden");
    }
  }, "showBackupEmailAddressForm");
  var showUploadForm = /* @__PURE__ */ __name(({ splitPermissionListResult }) => {
    const { splitPermissionList, clientId } = splitPermissionListResult.result;
    if (splitPermissionList.optional[`rw:${clientId}:file_v1`]) {
      document.querySelector("#uploadContainer").classList.remove("hidden");
      document.querySelector("#uploadedImgContainer").classList.remove("hidden");
    } else {
      document.querySelector("#uploadFilePermissionRequestContainer").classList.remove("hidden");
    }
  }, "showUploadForm");
  var addTabMenuContainer = /* @__PURE__ */ __name(({
    createTabMenuContainer: createTabMenuContainer2,
    showTabButton: showTabButton2,
    tabList,
    activeTabContainerId
  }) => {
    const tabMenuContainerElm = createTabMenuContainer2();
    const tabMenuContainerWrapElm = document.querySelector("#tabMenuContainerWrap");
    tabMenuContainerWrapElm.appendChild(tabMenuContainerElm);
    showTabButton2({ tabMenuContainerElm, tabList, activeTabContainerId });
  }, "addTabMenuContainer");

  // view/src/js/mypage/app.js
  var asocial = {};
  asocial.setting = setting_default;
  asocial.output = output_exports3;
  asocial.core = core_exports;
  asocial.input = input_exports2;
  asocial.action = action_exports;
  asocial.lib = lib_exports2;
  var a = asocial;
  var loadProfile = /* @__PURE__ */ __name(async () => {
    const userInfoResult = await a.input.fetchUserProfile(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.input.getRequest]
    }));
    a.lib.redirect(userInfoResult);
    a.output.showUserProfile(argNamed({
      lib: [a.lib.xdevkit.output.applyElmList],
      other: { userInfoResult }
    }));
    return userInfoResult;
  }, "loadProfile");
  var loadTimerBtn = /* @__PURE__ */ __name(async () => {
    const addTimer = a.output.getAddTimer(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.output.postRequest]
    }));
    const onClickAddTimerButton = a.action.getOnClickAddTimerButton(argNamed({
      output: { addTimer }
    }));
    a.output.setOnClickAddTimerButton(argNamed({
      onClick: { onClickAddTimerButton }
    }));
  }, "loadTimerBtn");
  var showNotification2 = /* @__PURE__ */ __name(() => {
    setInterval(() => {
      a.lib.common.output.showNotification(a.setting.browserServerSetting.getValue("apiEndpoint"), a.lib.xdevkit.output.showModal, a.lib.common.input.getRequest);
    }, 30 * 1e3);
  }, "showNotification");
  var loadMessageContent = /* @__PURE__ */ __name(async () => {
    const messageResult = await a.input.fetchMessage(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.input.getRequest]
    }));
    a.output.showMessage(argNamed({
      param: { messageResult }
    }));
  }, "loadMessageContent");
  var loadMessageBtn = /* @__PURE__ */ __name(() => {
    const saveMessage = a.output.getSaveMessage(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.output.postRequest]
    }));
    const onClickSaveMessageButton = a.action.getOnClickSaveMessageButton(argNamed({
      output: { saveMessage }
    }));
    a.output.setOnClickSaveMessageButton(argNamed({
      onClick: { onClickSaveMessageButton }
    }));
    const deleteMessage = a.output.getDeleteMessage(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.output.postRequest]
    }));
    const onClickDeleteMessageButton = a.action.getOnClickDeleteMessageButton(argNamed({
      output: { deleteMessage }
    }));
    a.output.setOnClickDeleteMessageButton(argNamed({
      onClick: { onClickDeleteMessageButton }
    }));
  }, "loadMessageBtn");
  var loadUploadForm = /* @__PURE__ */ __name(() => {
    const uploadFile = a.output.getUploadFile(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.output.postFormRequest]
    }));
    const onSubmitUploadForm = a.action.getOnSubmitUploadForm(argNamed({
      output: { uploadFile }
    }));
    a.output.setOnSubmitUploadForm(argNamed({
      onSubmit: { onSubmitUploadForm }
    }));
    const fetchUploadedFileList = a.input.getFetchUploadedFileList(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.input.getRequest]
    }));
    const loadUploadedImg = a.output.getLoadUploadedImg(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint")
    }));
    a.core.showUploadedImg(argNamed({
      input: { fetchUploadedFileList },
      output: { loadUploadedImg }
    }));
  }, "loadUploadForm");
  var loadPermission = /* @__PURE__ */ __name(async () => {
    const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue("apiEndpoint"));
    a.output.showEditor(argNamed({
      param: { splitPermissionListResult }
    }));
    a.output.showBackupEmailAddressForm(argNamed({
      param: { splitPermissionListResult }
    }));
    a.output.showUploadForm(argNamed({
      param: { splitPermissionListResult }
    }));
    a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId);
  }, "loadPermission");
  var loadTabBtn = /* @__PURE__ */ __name(async () => {
    const tabList = {
      editorTabContainer: "\u30A8\u30C7\u30A3\u30BF",
      timerTabContainer: "\u30BF\u30A4\u30DE\u30FC",
      backupEmailAddressFormTabContainer: "\u30D0\u30C3\u30AF\u30A2\u30C3\u30D7\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
      uploadTabContainer: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u753B\u50CF"
    };
    const activeTabContainerId = Object.keys(tabList)[0];
    a.output.addTabMenuContainer(argNamed({
      lib: [a.lib.xdevkit.output.createTabMenuContainer, a.lib.xdevkit.output.showTabButton],
      param: { tabList, activeTabContainerId }
    }));
  }, "loadTabBtn");
  var loadBackupEmailAddressForm = /* @__PURE__ */ __name(async ({ userInfoResult }) => {
    const backupEmailAddress = a.input.getBackupEmailAddress(argNamed({
      param: { userInfoResult }
    }));
    a.output.showBackupEmailAddress(argNamed({
      param: { backupEmailAddress }
    }));
    const saveBackupEmailAddress = a.output.getSaveBackupEmailAddress(argNamed({
      browserServerSetting: a.setting.browserServerSetting.getList("apiEndpoint"),
      lib: [a.lib.common.output.postRequest]
    }));
    const onSubmitBackupEmailAddress = a.action.getOnSubmitBackupEmailAddress(argNamed({
      param: { saveBackupEmailAddress }
    }));
    a.output.setOnSubmitBackupEmailAddress(argNamed({
      param: { onSubmitBackupEmailAddress }
    }));
  }, "loadBackupEmailAddressForm");
  var main = /* @__PURE__ */ __name(async () => {
    a.lib.xdevkit.output.switchLoading(true);
    a.lib.common.output.setOnClickNavManu();
    a.lib.monkeyPatch();
    const userInfoResult = await a.app.loadProfile();
    await a.app.loadBackupEmailAddressForm({ userInfoResult });
    a.app.loadTimerBtn();
    a.app.loadMessageContent();
    a.app.loadMessageBtn();
    a.app.loadUploadForm();
    a.app.loadTabBtn();
    a.app.showNotification();
    a.app.loadPermission();
    setTimeout(() => {
      a.lib.xdevkit.output.switchLoading(false);
    }, 300);
  }, "main");
  a.app = {
    main,
    loadProfile,
    loadTimerBtn,
    showNotification: showNotification2,
    loadMessageContent,
    loadMessageBtn,
    loadUploadForm,
    loadPermission,
    loadTabBtn,
    loadBackupEmailAddressForm
  };
  a.app.main();
})();
