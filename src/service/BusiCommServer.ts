import request from "@/utils/request";
import { IBaseFilter, IOptions2 } from "@/interface/IZlData";

/**
 * 搜索的类型，编码还是条目
 */
export declare type DSearchType = "code" | "item" | "theme" | "coding";

/**
 * 搜索的模式，nlp分词，pre不分词
 */
export declare type DSearchSchema = "nlp" | "pre";

export interface IScopeFilter extends IBaseFilter {
  /**
   * 搜索类型-条目还是其他的
   */
  searchType?: DSearchType;
  /**
   * 搜索的方式
   */
  searchSchema?: DSearchSchema;
  /**
   * 产业类型，字符串数组
   */
  industryTypes?: string[] | number[];
  /**
   * 产业类型多选，字符串拼接
   */
  industryTypeStr?: string;
  /**
   * 行业编码
   */
  industryCodes?: string[] | number[];
  /**
   * 经营方式
   */
  operationMode?: string;
  /**
   * 经营方式列表
   */
  operationModeList?: IOptions2[];
  /**
   * 企业分类
   */
  entClass?: string;
  /**
   * 企业分类列表
   */
  entClassList?: IOptions2[];
  /**
   * 企业类型
   */
  entType?: string;
  /**
   * 企业类型列表
   */
  entTypeList?: IOptions2[];
  /**
   * 业务类型
   */
  businessType?: string;
  /**
   * 业务类型
   */
  businessTypeList?: IOptions2[];
  /**
   * 主题
   */
  busiCombos?: string[] | number[];
  /**
   * 主题数据集合
   */
  busiCombosObj?: object;
  // 条目主键
  sId?: string;
  // 是否是包含项目
  isIncludedItem?: number;
  //  结果码
  cNo?: string;
  // 地区吗
  ac?: string;
}

/**
 * 获取详情的参数
 */
export interface IDetailsParams {
  scopeId: string;
  keyword: string;
  searchSchema?: DSearchSchema;
}

export default class BusiCommServer {
  /**
   * 搜索
   * @param params
   * @return {*}
   */
  static search(params: IScopeFilter) {
    return request("cloud-service/api/busiScope/search", {
      params,
      manner: "json"
    });
  }

  /**
   * 详情
   * @param params
   * @return {*}
   */
  static details(params: IDetailsParams) {
    return request("cloud-service/api/busiScope/details", {
      params,
      manner: "json"
    });
  }

  /**
   * 筛选菜单
   * @param params 参数
   * @return {*}
   */
  static filterMenu(params: IScopeFilter) {
    return request("cloud-service/api/busiScope/filterMenu", {
      params,
      manner: "json"
    });
  }

  /**
   * 不需要登录的生成组合码
   * @param params
   */
  static noBuildComposeCode(params: {
    itemList: string[];
    jyfwStr: string;
    ac?: string;
  }) {
    return request("cloud-service/cross/buildComposeCode", {
      params,
      manner: "json"
    });
  }

  /**
   * 解析组合码
   * @param cNo
   */
  static analysisComCode = (cNo: string) =>
    request("cloud-service/api/busiScope/analysisComCode", {
      params: {
        cNo
      }
    });

  /**
   * 根据经纬度获取地址
   * @param lat
   * @param lng
   */
  static getAddressByGPS = ({ lat, lng }: { lat: number; lng: number }) => {
    const url =
      "https://restapi.amap.com/v3/geocode/regeo?key=f659f27be5ae7fa4181bbf3410e7dc99&location=" +
      lng +
      "," +
      lat +
      "&poitype=商务写字楼&radius=1000&extensions=all&batch=false&roadlevel=0";
    return request(
      url,
      {
        method: "GET",
        isExternal: true
      },
      res => res
    );
  };
}
