import React, { Component } from 'react'

import UserForm from'./components/UserForm'
import ViewList from'./components/ViewList'
import userRequests from './services/userRequests.service'
import './App.css'


const getUpdatedUser = (updatedUserId, updatedUser) => user => updatedUserId === user.id ? updatedUser : user

const refreshUserData = (stateData, updatedUserId) => ({ data }) => stateData.map(getUpdatedUser(updatedUserId, data))

const updateStateData = view => data => {
  view.setState({
    route: 'list',
    data
  })
}

class App extends Component {

  state = {
    data: [],
    route: 'list'
  }

  constructor () {
    super()

    userRequests.getUsers()
      .then( ({ data }) => this.setState({ data }))
  }

  showEditUser = user => {
    this.setState({
      route: 'form',
      selectedUser: user
    })
  }

  showAddUser = () => {
    this.setState({
      route : 'form'
    })
  }

  addUser = user => {
    userRequests.addUser(user)
      .then( ({ data }) => {
        const newData = this.state.data.concat(data)
        this.setState({
          data: newData,
          route: 'list'
        })
      })
  }

  updateUser = (userId, formFields) => {
    userRequests.updateUser(userId, formFields)
      .then(refreshUserData(this.state.data, userId))
      .then(updateStateData(this))
  }

  render () {
    const { route, data, selectedUser } = this.state

    return (
      <div className="App">
        { route === 'list' &&  <ViewList
          data={ data }
          onAddUser={ this.showAddUser }
          onEditUser={ this.showEditUser }/>
        }
        { route === 'form' && <UserForm
          selectedUser={ selectedUser || {} }
          onHandleSubmit={ this.addUser }
          onHandleUpdate={ this.updateUser } /> }
      </div>
    )
  }
}

export default App
