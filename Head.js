import React, { Component } from "react";
import { View } from "react-native";
import { Zocial } from "@expo/vector-icons";
export default class Head extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const x = this.props.position[0];
    const y = this.props.position[1];
    return (
      <View
        style={{
          width: this.props.size,
          height: this.props.size,
          position: "absolute",
          left: x * this.props.size,
          top: y * this.props.size
        }}
      >
        <Zocial color="green" name="plancast" />
      </View>
    );
  }
}
