import Taro from "@tarojs/taro";
import { API_URL, tokenUrl } from "@/zlConfig";
import zlrequest, { Option as IOption } from "./zlrequest";

declare type ICallBack = (data: any) => void;

export type IServerName =
  | "passport-service"
  | "cloud-service"
  | "old-service"
  | "database-service"
  | "adminApi";

const request = (
  url: string,
  opt: IOption = {} as IOption,
  callback?: Function
) => {
  // 检查url是否需要进行扩充
  if (url.indexOf("http") === -1) {
    // 对URL进行扩展
    url = API_URL + url;
  }
  // 扩充请求头
  if (url.search(tokenUrl) !== -1) {
    opt.headers = {
      authorization: Taro.getStorageSync("jwtToken")
    };
  }

  return zlrequest(url, opt, callback);
};

export default request;

/**
 * 接口服务
 */
const cloudRequest = (
  url: string,
  opt: IOption = {} as IOption,
  callback?: ICallBack
) => {
  url = "cloudApi" + url;
  return request(url, opt, callback);
};

export { cloudRequest };
