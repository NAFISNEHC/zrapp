import { IServerName } from "./utils/request";

export const tokenUrl = "jyfwyun.com";

// 设置忽略渲染的url
export const loseUrl = ["/", "/user/login", "/user"];

/**
 * 接口服务
 */
export type IServerObj = {
  [key in IServerName]: string;
};

const ipObj = {
  https: "https://jyfwyun.com/api/jyfwcloud/"
};

// 导出项目地址
export const API_URL = ipObj.https;
