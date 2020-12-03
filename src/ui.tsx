import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

const TABLE_HEIGHT = 8
const TABLE_WIDTH = 8
const PIXEL_BUFFER = 10
const colors = ['red', 'orange', 'green', 'blue', 'purple']

class App extends React.Component {
  state = {
    game: []
  }

  draggingCell = null
  swappedCandy = null

  generateNewGame = () => {
    const game = []
    for (let i = 0; i < TABLE_HEIGHT; i++) {
      const row = []
      for (let j = 0; j < TABLE_WIDTH; j++) {
        const index = Math.floor(Math.random() * colors.length)
        const color = colors[index]
        const cell = <td
          key={`cell-${i}-${j}`}
          id={`cell-${i}-${j}`}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
        >
          <div>
            <img src={require(`./imgs/${color}.svg`)}/>
          </div>
        </td>
        row.push(cell)
      }
      game.push(<tr key={`row-${i}`}>{row}</tr>)
    }
    this.setState({
      game: game
    })
  }

  onMouseDown = (e) => {
    e.preventDefault()
    this.draggingCell = e.currentTarget as HTMLDivElement
  }

  onMouseMove = (e) => {
    e.preventDefault()
    if (this.draggingCell) {
      const draggingCellID = this.draggingCell.id.split('-')
      const row = parseInt(draggingCellID[1])
      const col = parseInt(draggingCellID[2])
      const candy = this.draggingCell.getElementsByTagName('img')[0]
      const bounds = this.draggingCell.getBoundingClientRect()

      const verticalCenter = bounds.top + bounds.height / 2
      const horizontalCenter = bounds.left + bounds.width / 2

      if (e.pageX < horizontalCenter - PIXEL_BUFFER) {
        // Left
        const adjacentCell = document.getElementById(`cell-${row}-${col - 1}`)
        this.swappedCandy = adjacentCell.getElementsByTagName('img')[0]
        candy.style.left = '-63'
        this.swappedCandy.style.left = '83'
      } else if (e.pageX > horizontalCenter + PIXEL_BUFFER) {
        // Right
        const adjacentCell = document.getElementById(`cell-${row}-${col + 1}`)
        this.swappedCandy = adjacentCell.getElementsByTagName('img')[0]
        candy.style.left = '83'
        this.swappedCandy.style.left = '-63'
      } else if (e.pageY < verticalCenter - PIXEL_BUFFER) {
        // Top
        const adjacentCell = document.getElementById(`cell-${row - 1}-${col}`)
        this.swappedCandy = adjacentCell.getElementsByTagName('img')[0]
        candy.style.top = '-63'
        this.swappedCandy.style.top = '83'
      } else if (e.pageY > verticalCenter + PIXEL_BUFFER) {
        // Bottom
        const adjacentCell = document.getElementById(`cell-${row + 1}-${col}`)
        this.swappedCandy = adjacentCell.getElementsByTagName('img')[0]
        candy.style.top = '83'
        this.swappedCandy.style.top = '-63'
      } else {
        const horizontalDelta = Math.floor(e.pageX - horizontalCenter)
        const verticalDelta = Math.floor(e.pageY - verticalCenter)
        if (Math.abs(horizontalDelta) > Math.abs(verticalDelta)) {
          candy.style.left = (10 + horizontalDelta).toString()
          candy.style.top = '10'
        } else {
          candy.style.top = (10 + verticalDelta).toString()
          candy.style.left = '10'
        }

        if (this.swappedCandy) {
          this.swappedCandy.style.left = '10'
          this.swappedCandy.style.top = '10'
          this.swappedCandy = null
        }
      }
    }
  }

  onMouseUp = () => {
    const candy = this.draggingCell.getElementsByTagName('img')[0]
    candy.style.left = 10
    candy.style.top = 10
    this.draggingCell = null

    if (this.swappedCandy) {
      this.swappedCandy.style.left = '10'
      this.swappedCandy.style.top = '10'
      this.swappedCandy = null
    }
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.state.game}
          </tbody>
        </table>
        <button id="new-game" onClick={this.generateNewGame}>New Game</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))