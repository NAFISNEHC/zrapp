import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import SearchBar from "./details/SearchBar";
import Tabs from "./details/Tabs";
import "./index.scss";

export default class List extends Component<{}> {

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  config: Config = {
    navigationBarTitleText: "首页"
  };

  render() {
    return (
      <View className="index">
        <SearchBar {...({} as any)} />
        <Tabs {...({} as any)} />
      </View>
    );
  }
}
