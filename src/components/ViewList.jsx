import React, { Component } from 'react'
import Header from './Header'
import List from './List'

class ViewList extends Component {
    render () {

        const { data, onEditUser, onAddUser } = this.props

        return (
            <div>
                <Header onAddUser={ onAddUser }/>
                <List userList={ data }
                    onEditUser={ onEditUser }/>
            </div>
        )
    }
}

export default ViewList