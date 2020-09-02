export default class StringUtils {
  /**
   * 将参数中的null，''等属性删除掉
   * @param params 需要判断的对象
   */
  static buildParamsNull(params?: object) {
    const newParams = {};
    if (params) {
      Object.keys(params).forEach(key => {
        if (this.isNoExit(params[key])) {
          newParams[key] = params[key];
        }
      });
    }
    return newParams;
  }

  /**
   * 判断是否存在
   * @param str 需要判断的参数
   */
  static isNoExit(str: any) {
    if (typeof str === "number") {
      return true;
    }
    if (str === "") {
      return false;
    }
    return str;
  }

  /**
   * 字符串添加省略
   * @param str 字符串
   * @param length 长度
   */
  static ellipsis(str: string, length: number = 10) {
    return str.substring(0, length);
  }
}
