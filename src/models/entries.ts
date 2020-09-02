import { Reducer } from "redux";
import { IOptions2 } from ".././interface/IZlData";

type Entry = {
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
   * 对应国民经济行业分类
   */
  gbName: IOptions2[];

  /**
   * 是否许可
   */
  isPermission: string;
};

// model内部方法
export interface IEntriesModelState {
  entries: Array<Entry>;
}

export interface IEntriesModelType {
  namespace: "entries";
  state: IEntriesModelState;
  effects: {};
  reducers: {
    save: Reducer<IEntriesModelState>;
  };
}

const EntriesModel: IEntriesModelType = {
  namespace: "entries",

  state: {
    entries: [{
      scopeId: "1",
      scopeCode: "C1001",
      standardItem: "家禽屠宰",
      gbName: [{
        text: "禽类屠宰",
        id: 1352
      }],
      isPermission: "后置许可"
    },
    {
      scopeId: "2",
      scopeCode: "L1001",
      standardItem: "机械设备租赁",
      gbName: [{
        text: "机械设备经营租赁",
        id: 711
      },{
        text: "机械设备经营租赁",
        id: 711
      }],
      isPermission: "一般事项"
    },{
      scopeId: "3",
      scopeCode: "P1013",
      standardItem: "营利性民办自学考试助学教育机构",
      gbName: [{
        text: "教育",
        id: 83
      }],
      isPermission: "前置许可"
    },{
      scopeId: "3",
      scopeCode: "P1013",
      standardItem: "营利性民办自学考试助学教育机构",
      gbName: [{
        text: "教育",
        id: 83
      }],
      isPermission: "前置许可"
    },{
      scopeId: "3",
      scopeCode: "P1013",
      standardItem: "营利性民办自学考试助学教育机构",
      gbName: [{
        text: "教育",
        id: 83
      }],
      isPermission: "前置许可"
    },{
      scopeId: "3",
      scopeCode: "P1013",
      standardItem: "营利性民办自学考试助学教育机构",
      gbName: [{
        text: "教育",
        id: 83
      }],
      isPermission: "前置许可"
    }]
  },

  effects: {},

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};

export default EntriesModel;
