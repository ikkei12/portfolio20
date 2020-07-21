import React from "react";
import "../styles/ArrowIcon.scss";

interface Props {
  isLeft: boolean;
}

export default class ArrowIcon extends React.Component<Props> {
  render() {
    return (
      <svg
        className={["arrow-icon", this.props.isLeft ? "prev-arrow" : ""].join(
          " "
        )}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512.002 512.002"
      >
        <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061a19.8 19.8 0 0014.057 5.835 19.79 19.79 0 0014.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z" />
      </svg>
    );
  }
}
