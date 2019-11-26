import React, { Component } from "react";
import Constants from "./constants/Constants";

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const GameLoop = (entities, { touches, dispatch, events }) => {
  let head = entities.head;
  let target = entities.target;

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-down" && head.ySpeed != -1) {
        head.ySpeed = 1;
        head.xSpeed = 0;
      } else if (events[i].type === "move-up" && head.ySpeed != 1) {
        head.ySpeed = -1;
        head.xSpeed = 0;
      } else if (events[i].type === "move-left" && head.xSpeed != 1) {
        head.ySpeed = 0;
        head.xSpeed = -1;
      } else if (events[i].type === "move-right" && head.xSpeed != -1) {
        head.ySpeed = 0;
        head.xSpeed = 1;
      }
    }
  }

  /*
    // Want swipe controls? Uncomment these and comment the above block
    touches.filter(t => t.type === "move").forEach(t => {
        if (head && head.position) {
            if (t.delta.pageY && t.delta.pageX){
                if (t.delta.pageY && Math.abs(t.delta.pageY) > Math.abs(t.delta.pageX)){
                    if (t.delta.pageY < 0 && head.yspeed != 1){
                        head.yspeed = -1;
                        head.xspeed = 0;
                    } else if (t.delta.pageY > 0 && head.yspeed != -1) {
                        head.yspeed = 1;
                        head.xspeed = 0;
                    }
                } else if (t.delta.pageX) {
                    if (t.delta.pageX < 0 && head.xspeed != 1){
                        head.xspeed = -1;
                        head.yspeed = 0;
                    } else if (t.delta.pageX > 0 && head.xspeed != -1) {
                        head.xspeed = 1;
                        head.yspeed = 0;
                    }
                }
            }
        }
    });
    */
  head.nextMove -= 1;
  if (head.nextMove === 0) {
    head.nextMove = head.updateFrequency;
    if (
      head.position[0] + head.xSpeed < 0 ||
      head.position[0] + head.xSpeed >= Constants.GRID_SIZE ||
      head.position[1] + head.ySpeed < 0 ||
      head.position[1] + head.ySpeed >= Constants.GRID_SIZE
    ) {
      // snake hits the wall
      dispatch({ type: "game-over" });
    } else {
      // snake moves
      head.position[0] += head.xSpeed;
      head.position[1] += head.ySpeed;

      if (
        head.position[0] === target.position[0] &&
        head.position[1] === target.position[1]
      ) {
        // hitting  target
        dispatch({
          type: "winner"
        });
      }
    }
  }

  return entities;
};

export { GameLoop };
