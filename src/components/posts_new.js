import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from "../actions";

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field; // field.meta.touched and field.meta.error
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // this === component
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button type="Submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

function validate(values) {
    // console.log(values) -> { title: 'asd', categories='asd', content='asd' }
    const errors = {};

    // validate the inputs from 'values'
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title is a least 3 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter a category!";
    }
    if (!values.content) {
        errors.content = "Enter a content!";
    }


    // if errors is empty, the form is fine to submit
    // if errors hsa *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostNewForm'
})(
   connect(null, { createPost }) (PostsNew)
);