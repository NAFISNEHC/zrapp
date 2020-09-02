import { Reducer } from "redux";

type History = {
  content: string;
  date: string;
};

// model内部方法
export interface IHistoryListModelState {
  historyList: Array<History>;
}

export interface IHistoryListModelType {
  namespace: "historyList";
  state: IHistoryListModelState;
  effects: {};
  reducers: {
    save: Reducer<IHistoryListModelState>;
  };
}

const HistoryListModel: IHistoryListModelType = {
  namespace: "historyList",

  state: {
    historyList: [
      {
        content: "医用口罩",
        date: "2020.03.21"
      },
      {
        content: "防护服",
        date: "2020.03.20"
      },
      {
        content: "医用酒精",
        date: "2020.03.19"
      },
      {
        content: "洗手液",
        date: "2020.03.19"
      },
      {
        content: "N95口罩",
        date: "2020.03.18"
      },
      {
        content: "医用防护服",
        date: "2020.03.17"
      },
      {
        content: "普通酒精",
        date: "2020.03.15"
      },
      {
        content: "普通酒精",
        date: "2020.03.15"
      },
      {
        content: "普通酒精",
        date: "2020.03.15"
      },
      {
        content: "普通酒精",
        date: "2020.03.15"
      }
    ]
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

export default HistoryListModel;
