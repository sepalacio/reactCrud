import React, { Component } from 'react'
import axios from 'axios'

import UserForm from'./components/UserForm'
import ViewList from'./components/ViewList'
import './App.css'

class App extends Component {

  state = {
    data: [],
    route: 'form'
  }

  constructor () {
    super()

    axios.get('https://jsonplaceholder.typicode.com/users')
      .then( ({ data }) => this.setState({ data }))
  }

  editUser = userId => {
    console.log('edit click App Component:', userId)
    this.setState({
      route: 'form',
      userId: userId
    })
  }

  addUser = () => {
    this.setState({
      route : 'form'
    })
  }

  render () {
    console.log('Users: ', this.state)
    
    const { route, data } = this.state

    return (
      <div className="App">
        { route === 'list' &&  <ViewList
          data={ data }
          onAddUser={ this.addUser }
          onEditUser={ this.editUser }/>
        }
        { route === 'form' && <UserForm /> }
      </div>
    )
  }
}

export default App
