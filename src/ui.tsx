import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

const TABLE_HEIGHT = 8
const TABLE_WIDTH = 8
const colors = ['red', 'orange', 'green', 'blue', 'purple']

class App extends React.Component {
  state = {
    game: []
  }

  generateNewGame = () => {
    const game = []
    for (let i = 0; i < TABLE_HEIGHT; i++) {
      const row = []
      for (let j = 0; j < TABLE_WIDTH; j++) {
        const index = Math.floor(Math.random() * colors.length)
        row.push(index)
      }
      game.push(row)
    }
    this.setState({
      game: game
    })
  }

  render() {
    const game = []
    this.state.game.forEach((row, i) => {
      const candies = []
      row.forEach((colorIndex, j) => {
        const candyColor = colors[colorIndex]
        const cell = <td key={`cell-${i}-${j}`} id={`cell-${i}-${j}`}><img src={require(`./imgs/${candyColor}.svg`)}/></td>
        candies.push(cell)
      })
      game.push(candies)
    })

    return (
      <div>
        <table>
          <tbody>
            {game.map((row, i) => {
              return <tr key={`row-${i}`}>{row}</tr>
            })}
          </tbody>
        </table>
        <button id="new-game" onClick={this.generateNewGame}>New Game</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'))