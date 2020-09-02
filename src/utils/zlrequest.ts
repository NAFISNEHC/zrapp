import Taro from "@tarojs/taro";
import stringUtils from "./StringUtils";

export type IServerName =
  | "passport-service"
  | "cloud-service"

/**
 * HTTP编码属性
 */
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  415: "请求的方式错误",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

// 定义request错误信息
const errObj: any = {};

/**
 * 接口的配置
 */
export interface Option {
  /**
   * 请求的类型
   */
  method?:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "OPTIONS"
    | "HEAD"
    | "TRACE"
    | "CONNECT";
  /**
   * 数据格式
   */
  manner?: "form" | "json" | "file" | "blob";
  /**
   * 请求头
   */
  headers?: {
    usertoken?: string;
    "Content-Type"?: string;
    Authorization?: string;
    [key: string]: string | null | undefined;
  };
  /**
   * 是否设置token
   */
  setToken?: boolean;
  /**
   * 是否是文件
   */
  isFile?: boolean;
  /**
   * 响应数据类型
   */
  responseType?: string;
  /**
   * 请求参数
   */
  params?: object;
  /**
   * 返回数据格式
   */
  dataType?: string;
  /**
   * 跨域配置
   */
  mode?: "no-cors" | "cors";
  /**
   * 是否是外部接口
   */
  isExternal?: boolean;
  /**
   * 服务名称
   */
  serverName?: IServerName;
}

// 默认的配置项
const defOption: Option = {
  method: "POST",
  manner: "form",
  setToken: false,
  isFile: false,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
};

// 构建错误信息
const buildErrorInfo = response => {
  // 解出url
  const { data } = response;
  // 截取接口
  const apiUrl = data.path.split("/").pop();
  const errortext = codeMessage[data.status] || response.statusText;
  // 处理错误信息
  Taro.showToast({
    title: `请求错误 ${data.status + errortext}: ${apiUrl}`,
    icon: "none"
  });
  return errortext;
};

/**
 * 异常捕获
 * @param e 异常信息
 */
const exceptionCatching = e => {
  // 解构数据
  const { response } = e;
  if (!response) {
    return Promise.reject(new Error("数据异常"));
  }
  const { status } = response;
  // 判断用户是否登陆
  const jwtToken = Taro.getStorageSync("jwtToken");
  if (jwtToken) {
    if (status === 401) {
      Taro.showToast({
        title: "登录错误，需要重新登录",
        icon: "none",
        mask: true
      });
      // 去登录页面
      Taro.navigateTo({
        url: "/user/login"
      });
    }
  }
  return Promise.reject(new Error("数据异常"));
};

/**
 * 后台返回的状态码检测
 * @param response 返回值
 * @return {*}
 */
const checkStatus = response => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.data;
  }
  errObj.status = response.statusCode;
  errObj.response = response;
  errObj.message = buildErrorInfo(response);
  return new Error(errObj);
};

/**
 * axios错误拦截
 * @param data
 * @param type
 */
function errorIntercept(data, type?: string) {
  let jsonData = null;
  // 判断是否文件下载
  if (type === "blob") {
    jsonData = data;
  } else if (Number(data.code) === 0) {
    jsonData = data.result;
  } else {
    // 处理错误信息
    Taro.showToast({
      title: "数据请求失败：" + data.msg,
      icon: "none",
      mask: true
    });
    if (data.msg && data.msg.indexOf("token") > 0) {
      // 去登录页面
      Taro.navigateTo({
        url: "/user/login"
      });
    }
    return new Promise((_resolve, reject) => {
      reject(new Error(data.msg || "数据获取失败，后台显示错误！"));
    });
  }
  // 返回数据
  return jsonData;
}

/**
 * 在taro框架下，发送数据请求的方法
 * @param url 请求的地址
 * @param option 请求配置项
 * @param callback 回调函数
 */
export default async function zlrequest(
  url: string,
  option?: object,
  callback?: Function
) {
  const newOptions = { ...defOption, ...option };
  // 判断是否是文件
  const { isFile } = newOptions;

  // 如果是文件的话，就要设置请求类型
  if (isFile) {
    // 设置响应类型
    newOptions.responseType = "blob";
  }
  // 去除无效的参数
  newOptions.params = stringUtils.buildParamsNull(newOptions.params);
  // 获取请求头
  const oldHeaders = newOptions.headers;
  // 判断参数类型
  if (newOptions.manner !== "json") {
    // 合并请求头
    newOptions.headers = {
      ...oldHeaders,
      ...{ "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }
    };
  } else {
    // json格式
    newOptions.headers = {
      ...oldHeaders,
      ...{ "Content-Type": "application/json;charset=utf-8" }
    };
  }
  // 获取要添加token的url
  const tokenUrl = Taro.getStorageSync("tokenUrl");
  // 请求的地址判断
  if (url.search(tokenUrl) > -1) {
    // 加上请求头
    newOptions.headers.authorization = Taro.getStorageSync("jwtToken");
  }
  // 请求方式转小写
  try {
    console.log("请求的地址：" + url);
    console.log("参数：", {
      url,
      data: newOptions.params,
      header: newOptions.headers,
      mode: "cors",
      method: newOptions.method
    });
    const response = await Taro.request({
      url,
      data: newOptions.params,
      header: newOptions.headers,
      mode: "cors",
      method: newOptions.method
    });
    const resJson = await checkStatus(response);
    // 错误信息判断
    if (Object.keys(errObj).length === 0) {
      if (callback) {
        return callback(resJson);
      }
      // TODO 判断是否文件下载
      if (newOptions.manner === "blob" || isFile) {
        return errorIntercept(resJson, "blob");
      }
      return errorIntercept(resJson);
    } else {
      return new Promise((_resolve, reject) => {
        reject(new Error(JSON.stringify(errObj)));
      });
    }
  } catch (e) {
    return exceptionCatching(e);
  }
}
