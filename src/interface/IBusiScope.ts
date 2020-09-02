import React from "react";
import { IOptions2 } from "./IZlData";
/**
 * <p>
 * 套餐表，用来管理经营范围的套餐
 * </p>
 *
 * @author allahbin
 * @since 2019-10-10
 */
export interface IBusiCombo {
  /**
   * 套餐id
   */
  cId: string;

  /**
   * 套餐名称
   */
  cName: string;

  /**
   * 套餐一类
   */
  cAType: string;

  /**
   * 套餐二类
   */
  cBType: string;
}

/**
 * <p>
 * 套餐和条目的关联表
 * </p>
 *
 * @author allahbin
 * @since 2019-10-10
 */
export interface IBusiComboMap {
  /**
   * 关联id
   */
  mId: string;

  /**
   * 套餐id
   */
  cId: string;

  /**
   * 条目id
   */
  scopeId: string;
}

/**
 * <p>
 * 行业树
 * </p>
 *
 * @author allahbin
 * @since 2019-10-08
 */
export interface IBusiIndustry {
  /**
   * 行业id
   */
  inId: string;

  /**
   * 节点类型
   */
  noteType: string;

  /**
   * 行业名称
   */
  name: string;

  /**
   * 行业编码
   */
  code: string;

  /**
   * 行业父编码
   */
  pCode: string;
  // 子集
  children?: IBusiIndustry[];
}

/**
 * <p>
 * 经营范围关键词
 * </p>
 *
 * @author allahbin
 * @since 2019-10-08
 */
export interface IBusiKeywords {
  /**
   * 主键
   */
  keywordId: string;

  /**
   * 关键词
   */
  keywordName: string;

  /**
   * 来源
   */
  keywordSource: string;

  /**
   * 来源编码
   */
  sourceCode: string;

  /**
   * 是否是包含项 1表示是包含项 2表示是条目名 3表示是行业分类
   */
  isIncludedItem: number;

  /**
   * 是否可用1代表可用0代表不可用
   */
  isValid: number;

  /**
   * 是否许可
   */
  isPermit: string;

  /**
   * 是否前置
   */
  isPre: string;

  /**
   * 是否后置
   */
  isPos: string;

  /**
   * 关键词权重
   */
  weight: number;
}

/**
 * <p>
 * 2019.9.2 保留用
 * </p>
 *
 * @author allahbin
 * @since 2019-10-08
 */
export interface IBusiKeywordsMap {
  /**
   * 主键
   */
  mapId: string;

  /**
   * busi_keywords表主键
   */
  keywordId: string;

  /**
   * busi_dictionaries主键
   */
  scopeId: string;

  /**
   * 关键词是否是存量 1是0不是
   */
  isStock: number;
}

/**
 * <p>
 * 经营范围条目表
 * </p>
 *
 * @author allahbin
 * @since 2019-10-08
 */
export interface IBusiScopeItems {
  /**
   * 条目的唯一id
   */
  scopeId: string;

  /**
   * 条目编码
   */
  scopeCode: string;

  /**
   * 经营范围表述条目
   */
  standardItem: string;

  /**
   * 简要描述
   */
  description: string;

  /**
   * 对应国民经济行业分类（编码+表述）
   */
  gbName: string | IOptions2[];

  /**
   * 是否许可
   */
  isPermission: string;

  /**
   * 包含
   */
  includedItems: string;

  /**
   * 不包含
   */
  notIncluded: string;

  /**
   * 相关分类
   */
  relevantClass: string;

  /**
   * 备注
   */
  remarks: string;

  /**
   * 关键词来源
   */
  keywordSource: string;

  /**
   * 是否可用 1代表可用 0代表不可用
   */
  isValid: number;

  /**
   * 520“证照分离”改革事项（许可事项）
   */
  permitItem: string;

  /**
   * 前置许可
   */
  prePermit: string;

  /**
   * 后置许可
   */
  posPermit: string;

  /**
   * 非自贸区许可情况
   */
  notFtaPermission: string;

  /**
   * 自贸区许可情况
   */
  ftaPermission: string;

  /**
   * 是否选中
   */
  isSelect: boolean;
}

/**
 * 经营范围条目的信息，用来进行展示的
 */
export interface IBusiScopeInfo extends IBusiScopeItems {
  // 共享部门
  shareDep: string | undefined;
  /**
   * 相关包含
   */
  aboutIncluded: string[];
  /**
   * 收藏数
   */
  collectNum: number;
  /**
   * 点赞数
   */
  praiseNum: number;
  /**
   * 评论数
   */
  commentNum: number;
  /**
   * 是否收藏
   */
  isCollect: boolean;
  /**
   * 其他信息
   */
  otherInfo: IBusiScopeOtherInfo;
  /**
   * 事项类型，前置 后置 ''是一般
   */
  permitType?: "" | 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 事项说明
   */
  permitExplain?: string;
  // 状态
  isValid: 1 | 0;
  // 共享部门
  department?: string;
  busiScopeItems: IBusiScopeInfo;
  exist: IOptions2[];
  gbName: IOptions2[] | string;
  // 大类
  category: string;
  // 门类
  heading: string;
  // 设定依据
  itemBasis: string;
  apply?: boolean;
}

/**
 * <p>
 * 业务规范表
 * </p>
 *
 * @author allahbin
 * @since 2019-10-14
 */
export interface IBusiGuide {
  /**
   * 主键
   */
  gId: string;

  /**
   * 发布文号
   */
  issueNo: string;

  /**
   * 状态（有效）
   */
  status: string;

  /**
   * 发布时间
   */
  issueDate: string;

  /**
   * 有效时间
   */
  expiredDate: number;

  /**
   * 标题
   */
  title: string;

  /**
   * 文件内容
   */
  docContent: string;

  /**
   * 行业（行业门类）
   */
  industryCategory: string;

  /**
   * 行业（行业大类）
   */
  industryClass: string;

  /**
   * 类型（前置相关，后置相关，禁限相关，不属于行政许可等）
   */
  approvalType: string;

  /**
   * 依据
   */
  basis: string;

  /**
   * 适用企业类型适用企业类型
   */
  entType: string;

  /**
   * 适用业务分类
   */
  affairsType: string;

  /**
   * 备注
   */
  remark: string;
}

/**
 * <p>
 * 许可事项
 * </p>
 * @author allahbin
 * @since 2019-10-14
 */
export interface IBusiApproval {
  /**
   * 主键
   */
  aId: string;

  /**
   * 许可事项名称
   */
  aName: string;

  /**
   * 事项编码
   */
  aCode: string;

  /**
   * 许可类型
   */
  aType: string;

  /**
   * 许可证书名称
   */
  licenseName: string;

  /**
   * 对应行政职权
   */
  relatedAuthority: string;

  /**
   * 行政职权编码
   */
  authorityNo: string;

  /**
   * 改革方式
   */
  reformMode: string;

  /**
   * 改革举措
   */
  reformMeasure: string;

  /**
   * 来源
   */
  source: string;

  /**
   * 适用区域
   */
  availableArea: string;

  /**
   * 设定依据（法规依据）
   */
  basis: string;

  /**
   * 适用企业类型
   */
  entType: string;

  /**
   * 适用业务阶段
   */
  busiSection: string;

  /**
   * 行业门类
   */
  industryCategory: string;

  /**
   * 行业大类
   */
  industryClass: string;

  /**
   * 审批层级
   */
  approveLevel: string;

  /**
   * 实施机关
   */
  approveDep: string;

  /**
   * 主管部门
   */
  supervisorDep: string;

  /**
   * 推送部门（id）
   */
  departmentId: string;

  /**
   * 备注
   */
  remarks: string;

  /**
   * rowkey
   */
  rowKey: number;
  // 事项类型
  aTypeText: string;
  // 适用区域
  dName: string;
  // 是否许可
  isUsable: string;
  // 后续添加的，源数据没有这个用于控制打开隐藏
  flag?: boolean;
  areaList: IAreaList[];
}
// 使用区域
export interface IAreaList {
  adminCode: string;
  disName: string;
}

/**
 * <p>
 * 政策法规
 * </p>
 * @author allahbin
 * @since 2019-10-14
 */
export interface IBusiPolicy {
  pId: string;

  /**
   * 政策法规名称
   */
  pName: string;

  /**
   * 文书号
   */
  pDocNo: string;

  /**
   * 政策法规摘要
   */
  pAbstract: string;

  /**
   * 政策内容
   */
  pContent: string;

  /**
   * 政策法规备注
   */
  pRemarks: string;

  /**
   * 监管内容
   */
  overseeContent: string;

  /**
   * 发布时间
   */
  issueTime: string;

  /**
   * 文书号
   */
  docNum: string;

  /**
   * 有效失效的状态 1有效，0无效
   */
  status: 0 | 1;
}
// 主题类型
export interface ISysdiclist {
  dicId: string;
  dicKey: string;
  dicValue: string;
  groupKey: string;
  seqno: number;
}
// 区域
export interface IAddressList {
  text: "";
  id: string;
  ac: string;
  domain: string;
}

/**
 * 其他相关信息
 */
export interface IBusiScopeOtherInfo {
  // 许可事项
  busiApprovalList: IBusiApproval[];
  // 政策法规
  busiPolicyList: IBusiPolicy[];
  // 业务规范
  busiGuideList: IBusiGuide[];
  // 是否显示新增按钮
  showAddButton?: boolean;
  // 相关反馈意见
  FeedbackList: any[];
  // 新增按钮的回调
  addCallBack?: (key: string) => void;
  // 移除按钮
  removeClick?: (key: string, value: string) => void;
  // 操作按钮
  operationButton?: (key: string, value: any, id: string) => React.ReactNode[];
}
