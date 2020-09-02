import Taro, { Component } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import { AtList, AtListItem, AtIndexes } from "taro-ui";
import { connect } from "@tarojs/redux";
import { ConnectProps, ConnectState } from "@/models/connect";
import "./CitySearch.scss";

interface IProps extends ConnectState, ConnectProps {}

interface IState {
  keyWord: string;
  cities: Array<string>;
}

@connect(
  ({ currentCity, hotCities, cityList }: IProps) =>
    ({ currentCity, hotCities, cityList } as IProps)
)
export default class CitySearch extends Component<IProps, IState> {
  state: IState = {
    keyWord: "",
    cities: []
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleChange = e => {
    this.setState({
      keyWord: e.detail.value
    });
    this.handleCities(e.detail.value);
  };

  handleClick = item => {
    const { dispatch } = this.props;
    dispatch({
      type: "currentCity/save",
      payload: {
        cityName: item
      }
    });

    // 跳转到主页面
    this.toHome();
  };

  handleCities = keyWord => {
    const {
      cityList: { cityList }
    } = this.props;
    setTimeout(() => {
      const result = [""];
      result.splice(0);
      for (let i in cityList) {
        cityList[i].items.forEach(value => {
          if (value.name.indexOf(keyWord) > -1) {
            result.push(value.name);
          }
        });
      }
      this.setState({
        cities: result
      });
    }, 100);
  };

  toHome = () => {
    Taro.navigateBack({
      delta: 1
    });
  };

  onClick = item => {
    this.handleClick(item.name);
  };

  render() {
    const { keyWord, cities } = this.state;
    const {
      cityList: { cityList },
      currentCity: { cityName },
      hotCities: { hotCities }
    } = this.props;
    return (
      <View className="wrapper">
        <View className="search">
          <Input
            className="search-input"
            type="text"
            placeholder="请输入需要查找的城市名"
            value={keyWord}
            onInput={this.handleChange}
          />
        </View>
        {keyWord !== "" ? (
          <View className="search-list">
            <AtList>
              {cities.length === 0 ? (
                <View className="noMore">未找到当前城市</View>
              ) : (
                cities.map((item, index) => {
                  return (
                    <AtListItem
                      key={index}
                      title={item}
                      onClick={this.handleClick.bind(this, item)}
                    />
                  );
                })
              )}
            </AtList>
          </View>
        ) : (
          <View className="city-list">
            <AtIndexes list={cityList} onClick={this.onClick}>
              <View className="city-list-head">
                <View className="city-current">
                  <View className="header">当前城市</View>
                  <View className="current-cities">
                    <View className="current-city">{cityName}</View>
                  </View>
                </View>
                <View className="city-hot">
                  <View className="header">热门城市</View>
                  <View className="hot-cities">
                    {hotCities.map((item, index) => {
                      return (
                        <View
                          key={index}
                          className="hot-city"
                          onClick={this.handleClick.bind(this, item)}
                        >
                          {" "}
                          {item}{" "}
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </AtIndexes>
          </View>
        )}
      </View>
    );
  }
}
