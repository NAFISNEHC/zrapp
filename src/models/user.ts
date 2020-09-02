import { Reducer } from "redux";

// model内部方法
export interface IUserModelState {
  userName: string;
}

export interface IUserModelType {
  namespace: "user";
  state: IUserModelState;
  effects: {};
  reducers: {
    save: Reducer<IUserModelState>;
  };
}

const UserModel: IUserModelType = {
  namespace: "user",

  state: {
    userName: "张三"
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

export default UserModel;
