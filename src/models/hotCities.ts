import { Reducer } from "redux";

// model内部方法
export interface IHotCitiesModelState {
  hotCities: Array<string>;
}

export interface IHotCitiesModelType {
  namespace: "hotCities";
  state: IHotCitiesModelState;
  effects: {};
  reducers: {
    save: Reducer<IHotCitiesModelState>;
  };
}

const HotCitiesModel: IHotCitiesModelType = {
  namespace: "hotCities",

  state: {
    hotCities: ["北京", "上海", "长沙", "武汉", "三亚", "丽江"]
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

export default HotCitiesModel;
