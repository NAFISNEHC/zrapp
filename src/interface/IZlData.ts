import { Dayjs } from "dayjs";

/**
 * 由value和text组成的选项
 */
export interface IOptions1 {
  /**
   * 文本
   */
  text: any;
  /**
   * 值
   */
  value: any;
}

/**
 * 由id和text组成的选项
 */
export interface IOptions2 {
  /**
   * 文本
   */
  text: any;
  /**
   * 值
   */
  id: any;
}

/**
 * 由value和name组成的选项
 */
export interface IOptions3 {
  /**
   * 文本
   */
  name: any;
  /**
   * 值
   */
  value: any;
}

/**
 * 分页的数据
 */
export interface ITablePage<T> {
  /**
   * 列表数据
   */
  records: T[];
  /**
   * 单页大小
   */
  size: number;
  /**
   * 当前页数
   */
  current: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 总条数
   */
  total: number;
  /**
   * 是否升序
   */
  asc?: boolean;
}

/**
 * 文件对象
 */
export interface IFileItem {
  /**
   * 文件id
   */
  fileid: string;
  /**
   * 文件名称
   */
  filename: string;
  /**
   * 文件路径
   */
  filepath: string;
  /**
   * 文件格式
   */
  suffix: string;
  /**
   * 类型
   */
  type?: string;
}

/**
 * 初始筛选
 */
export interface IBaseFilter {
  /**
   * 搜索的关键词
   */
  keyword?: string;
  /**
   * 开始日期
   */
  startDay?: string | Dayjs;
  /**
   * 结束日期
   */
  endDay?: string | Dayjs;
  /**
   * 页码
   */
  pageNum: number;
  /**
   * 时间
   */
  time?: Dayjs[];
}

/**
 * 用来进行展示的文件数组
 */
export interface IFileObj2 {
  // 文件列表
  fileList: IFileItem[];
  // 文件类型中文名称
  typename: string;
}

/**
 * 版本信息
 */
export interface IVerInfo {
  /**
   * 版本号
   */
  verNum: string;
  /**
   * 所属系统
   */
  sysName: string;
  /**
   * 系统的类型
   */
  sysType: string;
  /**
   * 更新时间
   */
  upTime: number;
  /**
   * 更新内容
   */
  content: string;
}
/**
 * 天气
 */
export interface IWaterInfo {
  /**
   * 返回状态值为0或11：成功；0：失败
   */
  status: 0 | 1;
  /**
   * 返回结果总数目
   */
  count: number;

  /**
   * 返回的状态信息
   */
  info: string;

  /**
   * 返回状态说明,10000代表正确
   */
  infocode: string;

  /**
   * 实况天气数据信息
   */
  lives: IWaterLives[];
}

export interface IWaterLives {
  /**
   * 省份名
   */
  province: string;
  /**
   * 城市名
   */
  city: string;
  /**
   * 区域编码
   */
  adcode: string;
  /**
   * 天气现象（汉字描述）
   */
  weather: string;
  /**
   * 实时气温，单位：摄氏度
   */
  temperature: string;
  /**
   * 风向描述
   */
  winddirection: string;
  /**
   * 风力级别，单位：级
   */
  windpower: string;
  /**
   * 空气湿度
   */
  humidity: string;
  /**
   * 数据发布的时间
   */
  reporttime: string;
}

/**
 * 全部下拉列表的数据,获取推送类型、改革方式、业务阶段、对象类型列表
 */
export interface IAllList {
  /**
   * 推送类型
   */
  pushType: IOptions2[];
  /**
   * 改革方式
   */
  reformWay: IOptions2[];
  /**
   * 业务阶段
   */
  stageOfBusiness: IOptions2[];
  /**
   * 对象类型
   */
  objectType: IOptions2[];
}

/**
 * 树数据
 */
export interface ISysTree {
  // 自身编码
  code: string;
  // 父编码
  pcode: string;
  // 名称用于显示
  name: string;
  // 唯一标识
  id?: string;
  // 节点类型
  notetype?: 1 | 0 | "1" | "0";
  // 子元素
  childern?: ISysTree[];
}

/**
 * 微信信息
 */
export interface IWeCharTokenInfo {
  code: string;
  state: string;
}
