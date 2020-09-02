import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { connect } from "@tarojs/redux";
import { ConnectProps, ConnectState } from "@/models/connect";
import "./Tabs.scss";

type navData = {
  id: number;
  title: string;
};

interface IProps extends ConnectState, ConnectProps {}

interface IState {
  currentIndex: number;
  navList: Array<navData>;
}

@connect(
  ({ historyList, problemList }: IProps) =>
    ({ historyList, problemList } as IProps)
)
export default class Tabs extends Component<IProps, IState> {
  state: IState = {
    currentIndex: 0,
    navList: [
      {
        id: 1,
        title: "历史查询"
      },
      {
        id: 2,
        title: "常见问题"
      }
    ]
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  static options = {
    addGlobalClass: true
  };

  changeNavState = v => {
    this.setState(() => {
      return {
        currentIndex: v
      };
    });
  };

  render() {
    const { currentIndex, navList } = this.state;
    const {
      historyList: { historyList },
      problemList: { problemList }
    } = this.props;

    return (
      <View className="repairman-list__container">
        <View className="nav-title">
          {navList.map((item, index) => (
            <View
              className="nav-title__item"
              onClick={this.changeNavState.bind(this, index)}
              key={item.id}
            >
              <View
                className={`txt ${index === currentIndex ? "txt_active" : ""}`}
              >
                {item.title}
              </View>
              <View
                className={`border ${
                  index === currentIndex ? "border_active" : ""
                }`}
              />
            </View>
          ))}
        </View>
        <View className="nav-pane">
          {currentIndex === 0 ? (
            <ScrollView className="scroll-one" scrollY scrollWithAnimation>
              {historyList.length === 0 ? (
                <View className="noMore">没有更多了</View>
              ) : (
                <AtList>
                  {historyList.map((item, index) => (
                    <AtListItem
                      key={index}
                      title={item.content}
                      note={item.date}
                      arrow="right"
                    />
                  ))}
                </AtList>
              )}
            </ScrollView>
          ) : currentIndex === 1 ? (
            <View className="pane-two">
              {problemList.length === 0 ? (
                <View className="noMore">没有更多了</View>
              ) : (
                <AtList>
                  {problemList.map((item, index) => (
                    <AtListItem
                      key={index}
                      title={item.title}
                      note={item.date}
                      extraText={item.content}
                      arrow="right"
                    />
                  ))}
                </AtList>
              )}
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}
