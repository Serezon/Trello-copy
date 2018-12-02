import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from '../Header/Header.jsx'
import BoardContainer from '../BoardContainer/BoardContainer.jsx'
import Board from '../Board/Board.jsx'

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={BoardContainer} />
              <Route path='/board/:id' component={Board}/>
              <Route component={() => <h2 className='text-center display-1'>404</h2>} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
