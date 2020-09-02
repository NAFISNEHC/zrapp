import classNames from "classnames";
import PropTypes, { InferProps } from "prop-types";
import { Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import AtComponent from "@/components/component";
import { CommonEventFunction } from "@tarojs/components/types/common";

interface ITlIcon {
  value: string;
  color?: string;
  prefixClass?: string;
  size?: number | string;
  onClick?: CommonEventFunction;
  className?: string;
  customStyle?: React.CSSProperties | "";
}

export default class TlIcon extends AtComponent<ITlIcon> {
  public static defaultProps: ITlIcon;
  public static propTypes: InferProps<ITlIcon>;

  private handleClick(): void {
    this.props.onClick && this.props.onClick(arguments as any);
  }

  public render(): JSX.Element {
    const {
      customStyle,
      className,
      prefixClass,
      value,
      size,
      color
    } = this.props;

    const rootStyle = {
      fontSize: `${Taro.pxTransform(parseInt(String(size)) * 2)}`,
      color
    };

    return (
      <Text
        className={classNames(prefixClass, value, className)}
        style={this.mergeStyle(rootStyle, customStyle as object)}
        onClick={this.handleClick.bind(this)}
      />
    );
  }
}

TlIcon.defaultProps = {
  customStyle: "",
  className: "",
  prefixClass: "zl-icon at-icon",
  value: "",
  color: "",
  size: 24,
  onClick: () => {}
};

TlIcon.propTypes = {
  customStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  prefixClass: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func
};
