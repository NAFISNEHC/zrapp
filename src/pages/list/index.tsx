import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from 'taro-ui'
import Entrie from "./details/Entrie"
import "./index.scss";

interface IState {
  current: number;
}

export default class List extends Component<{}, IState> {
  state: IState = {
    current: 0
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick = value => {
    this.setState({
      current: value
    });
  };

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "列表"
  };

  render() {
    const tabList = [{ title: '条目' }, { title: '主题' }, { title: '组合码' }]
    return (
      <View className="index">
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            <Entrie {...({} as any)} />
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}
