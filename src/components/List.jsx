import React, { Component } from 'react'

class List extends Component {
    onEditUser = user => event => {
        const { onEditUser } = this.props
        onEditUser(user)
    }

    printUserItem = user => (
        <li key={ user.id }>
            { user.name }
            <button onClick={ this.onEditUser(user) }>Edit</button>
        </li>
    )

    render () {
        const { userList } = this.props

        return( <ul>{ userList.map(this.printUserItem) }</ul> )
    }
}

export default List