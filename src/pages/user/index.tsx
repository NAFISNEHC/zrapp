import Taro, { Component, Config } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { ConnectProps, ConnectState } from "@/models/connect";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss";

interface IProps extends ConnectState, ConnectProps {}

@connect(({ user }: IProps) => ({ user } as IProps))
export default class User extends Component<IProps> {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: ""
  };

  changeName = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "user/save",
      payload: {
        userName: "李四"
      }
    });
  };

  render() {
    const {
      user: { userName }
    } = this.props;
    return (
      <View className="index">
        <Text>{userName}</Text>
        <Button onClick={this.changeName}>改名字</Button>
      </View>
    );
  }
}
