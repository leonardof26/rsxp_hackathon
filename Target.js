import React, { Component } from "react";
import { View } from "react-native";
import { Turtle } from "react-native-vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
export default class Target extends Component {
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
        <MaterialIcons color="red" name="check-circle" />
      </View>
    );
  }
}
