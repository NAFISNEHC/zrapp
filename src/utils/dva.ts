import { create } from "dva-core";
import createLoading from "dva-loading";
import { createLogger } from "redux-logger";
import immer from "dva-immer";

let app;

let store;

let dispatch;

let registered;

function createApp(opt) {
  // redux 的日志
  opt.onAction = [createLogger()];
  app = create(opt);
  app.use(immer());
  app.use(createLoading());
  app.use({
    onError(err) {
      console.log(err);
    }
  });
  if (!registered) {
    opt.models.forEach(model => app.model(model));
  }

  registered = true;
  app.start();
  store = app._store;
  app.getStore = () => store;
  dispatch = store.dispatch;
  app.dispatch = dispatch;
  if (window) {
    window.g_app = app;
  }
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
};
