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
    let balls = []
    let dragging = null
    let offsetX, offsetY

    const p5 = require('p5')
    this.sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth / 2, p.windowHeight / 2).parent(this.renderRef.current)
        p.frameRate(30)
        for (let i = 0; i < 10; i++) {
          let ball = new Ball(p.random(p.windowWidth), p.random(p.windowHeight), p.random(20, 40))
          balls.push(ball)
        }
      }
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
      }

      p.draw = () => {
        for (let ball of balls) {
          ball.update()
          ball.display()
          ball.checkEdges()
          for (let otherBall of balls) {
            if (ball !== otherBall) {
              ball.checkCollision(otherBall)
            }
          }
        }
      }
      class Ball {
        constructor(x, y, r) {
          this.x = x
          this.y = y
          this.r = r
          this.dx = p.random(-4, 4) // Increase the initial speed
          this.dy = p.random(-4, 4) // Increase the initial speed
          this.htmlElement = p.createSpan() // Create a span element
          this.htmlElement.class('ball')
          this.htmlElement.position(this.x - this.r, this.y - this.r)
          this.htmlElement.mousePressed(() => {
            p.dragging = this
            p.offsetX = this.x - p.mouseX
            p.offsetY = this.y - p.mouseY
          })
          this.htmlElement.mouseReleased(() => {
            dragging = null
          })

          // Create an anchor element with the link
          let link = p.createA('https://example.com', 'Click me!')
          link.parent(this.htmlElement)
        }

        update() {
          if (dragging === this) {
            this.x = p.mouseX + offsetX
            this.y = p.mouseY + offsetY
          } else {
            this.x += this.dx
            this.y += this.dy

            // Apply velocity decay if speed falls below a certain limit
            let speed = p.dist(0, 0, this.dx, this.dy)
            if (speed < 0.1) {
              this.dx = p.random(-4, 4) // Reset speed if too slow
              this.dy = p.random(-4, 4)
            }
          }
          this.htmlElement.position(this.x - this.r, this.y - this.r)
        }

        display() {
          // No need for display method here, as we're using HTML elements for the balls
        }

        checkEdges() {
          let bounceFactor = 0.9

          for (let otherBall of balls) {
            if (this !== otherBall) {
              let dx = this.x - otherBall.x
              let dy = this.y - otherBall.y
              let distance = p.sqrt(dx * dx + dy * dy)
              let minDistance = this.r + otherBall.r

              if (distance < minDistance) {
                let angle = p.atan2(dy, dx)
                let overlap = minDistance - distance
                let targetX1 = this.x + p.cos(angle) * (overlap / 2)
                let targetY1 = this.y + p.sin(angle) * (overlap / 2)
                let targetX2 = otherBall.x - p.cos(angle) * (overlap / 2)
                let targetY2 = otherBall.y - p.sin(angle) * (overlap / 2)
                this.x = targetX1
                this.y = targetY1
                otherBall.x = targetX2
                otherBall.y = targetY2

                // Adjust velocities to bounce away
                let angleNormal = p.atan2(dy, dx)
                let thisNewVelocity = this.dx * p.cos(angleNormal) + this.dy * p.sin(angleNormal)
                let otherNewVelocity =
                  otherBall.dx * p.cos(angleNormal) + otherBall.dy * p.sin(angleNormal)
                let thisFinalVelocity =
                  ((this.r - otherBall.r) * thisNewVelocity +
                    (this.r + otherBall.r) * otherNewVelocity) /
                  (this.r + otherBall.r)
                let otherFinalVelocity =
                  ((otherBall.r - this.r) * otherNewVelocity +
                    (this.r + otherBall.r) * thisNewVelocity) /
                  (this.r + otherBall.r)
                this.dx = thisFinalVelocity * p.cos(angleNormal)
                this.dy = thisFinalVelocity * p.sin(angleNormal)
                otherBall.dx = otherFinalVelocity * p.cos(angleNormal)
                otherBall.dy = otherFinalVelocity * p.sin(angleNormal)
              }
            }
          }

          if (this.x - this.r < 0 || this.x + this.r > p.windowWidth) {
            this.dx *= -bounceFactor
          }
          if (this.y - this.r < 0 || this.y + this.r > p.windowHeight) {
            this.dy *= -bounceFactor
          }
        }

        checkCollision(otherBall) {
          // Collision logic is handled in checkEdges()
        }
      }
    })

    //
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
