import React, { Component } from 'react'
// import logo from './logo.svg';

class Sketch extends Component {
  constructor() {
    super()
    this.renderRef = React.createRef()
    this.state = {
      x: 50,
      y: 50,
    }
  }

  componentDidMount() {
    const p5 = require('p5')
    this.sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth / 2, p.windowHeight / 2).parent(this.renderRef.current)
        p.frameRate(30)
        p.background('black')
        p.strokeWeight(5)
      }
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.draw = () => {
        if (p.mouseIsPressed) {
          p.stroke(225)
        } else {
          p.stroke(0, 0, 0)
        }
        p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY)
        p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY)
      }
    })
  }
  render() {
    return (
      <div className="App">
        <div ref={this.renderRef}></div>
      </div>
    )
  }
}

export default Sketch
