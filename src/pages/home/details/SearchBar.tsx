import Taro, { Component } from "@tarojs/taro";
import { View, Input, Text } from "@tarojs/components";
import { AtIcon } from "taro-ui";
import { connect } from "@tarojs/redux";
import { ConnectProps, ConnectState } from "@/models/connect";
import TlIcon from "@/components/TlIcon/TlIcon";
import "./SearchBar.scss";
import Tips from "@/utils/Tips";

interface IProps extends ConnectState, ConnectProps {}

interface IState {
  value: string;
  index: number;
}

@connect(
  ({ currentCity, hotList, historyList }: IProps) =>
    ({ currentCity, hotList, historyList } as IProps)
)
export default class SearchBar extends Component<IProps, IState> {
  state: IState = {
    value: "",
    index: 0
  };

  componentDidMount() {
    this.getLocation();
  }

  getLocation = () => {
    Taro.getLocation({ type: "wgs84" })
      .then(gps => {
        this.props.dispatch({
          type: "currentCity/initLocation",
          payload: {
            lat: gps.latitude,
            lng: gps.longitude
          }
        });
      })
      .catch(() => {
        Tips.toast("获取地理位置信息失败");
      });
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  onActionClick = () => {
    this.handleValue();
    this.setState({
      value: ""
    });
  };

  onhotClick = () => {
    const {
      hotList: { hotList }
    } = this.props;
    let index = this.state.index;
    let length = hotList.length;
    index >= length - 1 ? (index = 0) : index++;
    this.setState({
      index: index
    });
  };

  toCity = () => {
    Taro.navigateTo({
      url: "/pages/city/index"
    });
  };

  handleValue = () => {
    if (this.state.value != "") {
      const {
        dispatch,
        historyList: { historyList }
      } = this.props;
      let datetime = new Date();
      let year = datetime.getFullYear();
      let month =
        datetime.getMonth() + 1 < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1;
      let date =
        datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      dispatch({
        type: "historyList/save",
        payload: {
          historyList: [
            {
              content: this.state.value,
              date: year.toString() + "." + month + "." + date
            },
            ...historyList
          ]
        }
      });
    }
  };

  render() {
    const {
      currentCity: { cityName },
      hotList: { hotList }
    } = this.props;
    const { value, index } = this.state;
    return (
      <View className="title">
        <View className="select-city" onClick={this.toCity}>
          {cityName}
          <TlIcon value="icon-icon-test10" size="12" color="#fff" />
        </View>
        <View className="title-text at-row at-row__justify--center">
          <Text className="title-left">知融助手</Text>
          <View className="title-right">
            经营范围规范表述查询系统（试用版）
          </View>
        </View>
        <View className="title-search">
          <View className="search-wrapper">
            <AtIcon
              className="search-icon"
              value="search"
              size="15rpx"
              color="#808080"
              onClick={this.onActionClick}
            />
            <Input
              className="search-input"
              value={value}
              type="text"
              placeholder="请输入您需要查询的经营活动关键词"
              onInput={this.onChange}
              onConfirm={this.onActionClick}
            />
          </View>
        </View>
        <View className="title-hot">
          <Text className="hot-text">热搜：{hotList[index]}</Text>
          <View className="hot-wrapper">
            <AtIcon value="reload" size="12rpx" color="#fff" />
            <Text className="hot-btn" onClick={this.onhotClick}>
              换一批
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
