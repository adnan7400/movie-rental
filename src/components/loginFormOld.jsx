import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
class LoginForm extends Component {
  //   username = React.createRef(); //to acces a DOM element, use a react Ref object and in our input element (tag) below add a ref to this ref object.

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  //   handleSubmit = event => {
  //     event.preventDefault();
  //     //Call the server, save changes, redirect user to different page

  //     /**Saving the value of our input fields from users */
  //     // const username = this.username.current.value;
  //     console.log("Submitted");
  //   };

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.account, this.schema, options);
    // console.log(result);
    if (!result.error) return null;

    //otherwise we get that array 'details' inside the error property inside Joi result (error) object above
    const errors = {};
    for (let item of result.error.details) {
      //go in error property of result object. Inside error property is a details array. Iterate through this array. Every item in array has another array called path, and one item called message.
      errors[item.path[0]] = item.message; //set each detail array item's path[0] item as index and message inside as the value of that index. to the error object we created before the for loop. Then return this errors object.
    }
    return errors;
  };

  //   validate = () => {
  //     const result = Joi.validate(this.state.account, this.schema, {
  //       abortEarly: false
  //     }); //by default, Joi terminates validation as soon as it finds an error. This is called abort early.
  //     //We map this Joi object we received into the errors object in state
  //     console.log(result);

  //     const errors = {};

  //     const { account } = this.state;
  //     if (account.username.trim() === "")
  //       errors.username = "Username is required";
  //     if (account.password.trim() === "")
  //       errors.password = "Password is required";

  //     return Object.keys(errors).length === 0 ? null : errors;
  //   };

  handleSubmit = event => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // console.log("Submitted");
  };

  //   handleChange = event => {
  //     const account = { ...this.state.account };
  //     account.username = event.currentTarget.value; //currentTarget returns our input field
  //     this.setState({ account });
  //   };

  //function to check the Input field when changed by user, something they typed in (triggering onChange event of Input component)
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  //   validateProperty = ({ name, value }) => {
  //     if (name === "username") {
  //       if (value.trim() === "") return "Username is required";
  //     }
  //     if (name === "password") {
  //       if (value.trim() === "") return "Password is required";
  //     }
  //   };

  //destructured version of handChange above
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value; //working with properties of an object dynamically. String that
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
