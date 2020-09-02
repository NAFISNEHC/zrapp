import { Reducer } from "redux";

// model内部方法
export interface IHotListModelState {
  hotList: Array<string>;
}

export interface IHotListModelType {
  namespace: "hotList";
  state: IHotListModelState;
  effects: {};
  reducers: {
    save: Reducer<IHotListModelState>;
  };
}

const HotListModel: IHotListModelType = {
  namespace: "hotList",

  state: {
    hotList: ["医用口罩与防护服", "玻璃纤维及制品制造"]
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

export default HotListModel;
