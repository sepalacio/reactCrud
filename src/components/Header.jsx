import React, { Component } from 'react'

const styles = {
    inline: {
        display: 'inline'
    }
}

class Header extends Component {
    render () {

        const { onAddUser } = this.props

        return(
            <header>
                <h1 style={ styles.inline }>Users</h1>
                <button style={ styles.inline }
                    onClick={ onAddUser }>Add user</button>
            </header>
        )
    }
}

export default Header