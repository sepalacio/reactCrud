import React, { Component } from 'react'

class List extends Component {

    onEditUser = userId => event => {
        console.log('edit click List Component:', userId)
        const { onEditUser } = this.props
        onEditUser(userId)
    }

    printUserItem = user => (
        <li key={ user.id }>
            { user.name }
            <button onClick={ this.onEditUser(user.id) }>Edit</button>
        </li>
    )

    render () {

        const { userList } = this.props

        return(
            <ul>{ userList.map(this.printUserItem) }</ul>
        )
    }
}

export default List