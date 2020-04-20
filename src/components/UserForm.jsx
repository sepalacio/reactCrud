import React, { Component } from 'react'

const invalidInputs = errors => errors.length > 0

const formValidator = formFields => {
    const emptyFields = Object.keys(formFields)
        .filter(isInputEmpty(formFields))
        .reduce(getEmptyField, {})
    return emptyFields
}

const isInputEmpty = formFields => inputKey => !formFields[inputKey]

const isEditingUser = user => user.id

const getEmptyField = (erroredFields, field) => {
    erroredFields[field] = `The ${field} is required`
    return erroredFields
}

class UserForm extends Component {
    state = {
        errors: {}
    }

    constructor (props) {
        super(props)

        this.state = {
            ...this.state,
            ...props.selectedUser
        }
    }

    onInputChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const { errors, ...formFields } = this.state
        const erroredFiedls = formValidator(formFields)

        if(!invalidInputs(Object.keys(erroredFiedls))) {
            const { onHandleSubmit, onHandleUpdate, selectedUser } = this.props
            event.target.reset()
            isEditingUser(selectedUser) ? onHandleUpdate(selectedUser.id, formFields) : onHandleSubmit(formFields)
        } else {
            this.setState({ errors: erroredFiedls })
        }
    }

    render () {
        const { errors } =  this.state
        const { selectedUser } =  this.props

        return (
            <form onSubmit={ this.handleSubmit }>
                <input type="text"
                    name="name"
                    defaultValue={ selectedUser.name }
                    placeholder="Name"
                    onChange={ this.onInputChange }/>
                { errors.name && <p>{ errors.name }</p> }

                <input type="text"
                    name="email"
                    defaultValue={ selectedUser.email }
                    placeholder="Email"
                    onChange={ this.onInputChange }/>
                { errors.email && <p>{ errors.email }</p> }

                <input type="text"
                    name="website"
                    defaultValue={ selectedUser.website }
                    placeholder="Website"
                    onChange={ this.onInputChange }/>
                { errors.website && <p>{ errors.website }</p> }

                <input type="submit"
                    value="Send"/>
            </form>
        )
    }
}

export default UserForm