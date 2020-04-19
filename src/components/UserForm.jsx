import React, { Component } from 'react'

const invalidInputs = errors => errors.length > 0

const formValidator = formFields => {
    const emptyFields = Object.keys(formFields)
        .filter(isInputEmpty(formFields))
        .reduce(getEmptyField, {})
    return emptyFields
}

const isInputEmpty = formFields => inputKey => !formFields[inputKey]

const getEmptyField = (erroredFields, field) => {
    erroredFields[field] = `The ${field} is required`
    return erroredFields
}

class UserForm extends Component {
    state = {
        errors: {},
        name: '',
        email: '',
        website: ''
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

        this.setState({ errors: erroredFiedls })

        if(!invalidInputs(Object.keys(erroredFiedls))) {
            console.log('validForm')
            
            event.target.reset()
        }
    }

    render () {
        const { errors } =  this.state

        return (
            <form onSubmit={ this.handleSubmit }>
                <input type="text"
                    name="name"
                    placeholder="Name"
                    onChange={ this.onInputChange }/>
                { errors.name && <p>{ errors.name }</p> }

                <input type="text"
                    name="email"
                    placeholder="Email"
                    onChange={ this.onInputChange }/>
                { errors.email && <p>{ errors.email }</p> }

                <input type="text"
                    name="website"
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