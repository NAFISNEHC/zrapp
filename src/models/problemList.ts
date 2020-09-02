import { Reducer } from "redux";

type Problem = {
  title: string;
  content: string;
  date: string;
};

// model内部方法
export interface IProblemListModelState {
  problemList: Array<Problem>;
}

export interface IProblemListModelType {
  namespace: "problemList";
  state: IProblemListModelState;
  effects: {};
  reducers: {
    save: Reducer<IProblemListModelState>;
  };
}

const ProblemListModel: IProblemListModelType = {
  namespace: "problemList",

  state: {
    problemList: []
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

export default ProblemListModel;
