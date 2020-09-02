import { Reducer } from "redux";
import { Effect } from "@/models/connect";
import BusiCommServer from "@/service/BusiCommServer";

// model内部方法
export interface ICurrentCityModelState {
  cityName: string;
  // 行政区编码
  ac: string;
}

export interface ICurrentCityModelType {
  namespace: "currentCity";
  state: ICurrentCityModelState;
  effects: {
    initLocation: Effect;
  };
  reducers: {
    save: Reducer<ICurrentCityModelState>;
  };
}

const CurrentCityModel: ICurrentCityModelType = {
  namespace: "currentCity",

  state: {
    cityName: "定位中",
    ac: "000000"
  },

  effects: {
    /**
     * 说明：初始化地理信息
     * @author tangbin
     */
    *initLocation({ payload }, { call, put, select }) {
      const address = yield call(BusiCommServer.getAddressByGPS, payload);
      let cityName = address.regeocode.addressComponent.city;
      cityName = cityName.substring(0,cityName.length-1)
      console.log(address);
      yield put({
        type: "save",
        payload: {
          cityName: cityName,
          ac: address.regeocode.addressComponent.adcode
        }
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};

export default CurrentCityModel;
