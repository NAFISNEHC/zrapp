import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { AtNoticebar, AtIcon, AtSearchBar, AtDrawer, AtList } from 'taro-ui'
import { connect } from "@tarojs/redux";
import { ConnectProps, ConnectState } from "@/models/connect";
import "./Entrie.scss";

interface IState {
  value: string;
  show: boolean;
}

interface IProps extends ConnectState, ConnectProps {}

@connect(
  ({ entries }: IProps) =>
    ({ entries } as IProps)
)
export default class Entrie extends Component<IProps, IState> {
  
  state: IState = {
    value: "",
    show: false,
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  onChange = value => {
    this.setState({
      value: value
    });
  };

  onActionClick = () => {
    console.log("开始搜索");
  };

  handleFilterClick = () => {
    this.setState({
      show: !this.state.show
    });
  };

  onClose = () => {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const { show, value } = this.state;
    const {
      entries: { entries }
    } = this.props;
    return (
      <View className="entries">
        <AtNoticebar icon='volume-plus'>以下条目可能涉及禁止限制目录，请向当地市场监管部门咨询</AtNoticebar>
        <View className="filter">
          <View className="filter-search">
            <AtSearchBar
              showActionButton
              value={value}
              onChange={this.onChange.bind(this)}
            />
          </View>
          <View className="filter-all" onClick={this.handleFilterClick.bind(this)}>
            筛选
            <AtIcon value='chevron-down' size='13' color='#fff'></AtIcon>
          </View>
          <View className="filter-drawer">
            <AtDrawer 
              show={show} 
              right 
              mask 
              onClose={this.onClose.bind(this)} 
              items={['菜单1', '菜单2', '菜单2', '菜单2', '菜单2']}
>           </AtDrawer>
          </View>
        </View>
        <View className="list">
          <ScrollView className="scroll" scrollY scrollWithAnimation>
              {entries.length === 0 ? (
                <View className="noMore">没有更多了</View>
              ) : (
                <AtList>
                  {entries.map((item, index) => {
                    let gb = "";
                    gb += item.gbName.map((gbitem) => {
                      return `${gbitem.id} - ${gbitem.text}`
                    });
                    console.log(gb);
                    return (
                      <View className="at-card" key={index}>
                        <View className="at-card__header">
                          <Text className="at-card__header-title">{item.scopeCode}</Text>
                          <Text className={`at-card__header-extra ${
                            item.isPermission === '前置许可' ? "at-card__header-extra-pre" : 
                            item.isPermission === '后置许可' ? "at-card__header-extra-next" :
                            item.isPermission === '一般事项' ? "at-card__header-extra-normal" : ""
                          }`}>{item.isPermission}</Text>
                        </View>
                        <View className="at-card__content">
                          <View className="at-card__content-info">{item.standardItem}</View>
                          <View className="at-card__content-note">({item.gbName.length}) {gb}</View>
                        </View>
                        <View>

                        </View>
                      </View>
                    );
                  })}
                </AtList>
              )}
            </ScrollView>
        </View>
      </View>
    );
  }
}
