import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "./constants/Constants";
import { GameEngine } from "react-native-game-engine";
import Head from "./Head";
import Target from "./Target";
// if trouble -> remove {}
import { GameLoop } from "./GameLoop";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true
    };
  }
  onEvent = e => {
    if (e.type === "game-over") {
      alert("Fim de jogo");
      this.setState({
        running: false
      });
    }
    if (e.type === "winner") {
      alert("Parabéns, voce conseguiu!");
      this.setState({
        running: false
      });
    }
  };
  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) - 1);
  };
  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={ref => {
            this.engine = ref;
          }}
          style={{
            width: this.boardSize,
            height: this.boardSize,
            flex: null,
            backgroundColor: "#dddd"
          }}
          systems={[GameLoop]}
          entities={{
            head: {
              position: [0, 0],
              // if zero -> holds until input
              xSpeed: 1,
              ySpeed: 0,
              updateFrequency: 10,
              nextMove: 10,
              size: Constants.CELL_SIZE,
              renderer: <Head />
            },
            target: {
              position: [
                this.randomBetween(0, Constants.GRID_SIZE - 1),
                this.randomBetween(0, Constants.GRID_SIZE - 1)
              ],

              size: Constants.CELL_SIZE,
              renderer: <Target />
            }
          }}
          onEvent={this.onEvent}
          running={this.state.running}
        />
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-up" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-left" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
            <View style={[styles.control, { backgroundColor: null }]} />
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-right" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity
              onPress={() => {
                this.engine.dispatch({ type: "move-down" });
              }}
            >
              <View style={styles.control} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dddd",
    justifyContent: "center",
    alignItems: "center"
  },
  controls: {
    width: 300,
    height: 300,
    flexDirection: "column"
  },
  controlRow: {
    width: 300,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  control: {
    height: 100,
    width: 100,
    backgroundColor: "#7159c1"
  }
});
