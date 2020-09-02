import { AnyAction } from "redux";
import { IUserModelState } from "@/models/user";
import { ICurrentCityModelState } from "@/models/currentCity";
import { IHotListModelState } from "@/models/hotList";
import { IHistoryListModelState } from "@/models/historyList";
import { ICityListModelState } from "@/models/cityList";
import { IHotCitiesModelState } from "@/models/hotCities";
import { IProblemListModelState } from "@/models/problemList";
import { IEntriesModelState } from "@/models/entries";

export interface ILoading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    home?: boolean;
  };
}

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

/**
 * 路由的配置
 */
export interface ILocation {
  query: any;
}

/**
 * @type P: Params matched in dynamic routing
 */
export interface ConnectProps<P = any> {
  dispatch: Dispatch;
  location?: { [key: string]: any };
  loading: ILoading;
}

export interface ConnectState {
  user: IUserModelState;
  currentCity: ICurrentCityModelState;
  hotList: IHotListModelState;
  historyList: IHistoryListModelState;
  cityList: ICityListModelState;
  hotCities: IHotCitiesModelState;
  problemList: IProblemListModelState;
  entries: IEntriesModelState;
}

export interface IZlAnyAction<T> extends AnyAction {
  payload: T;
}

export type Effect<T = any> = (
  action: IZlAnyAction<T>,
  effects: EffectsCommandMap & {
    select: <T>(func: (state: ConnectState) => T) => T;
  }
) => void;

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any;
  call: Function;
  select: Function;
  take: Function;
  cancel: Function;
  [key: string]: any;
}
