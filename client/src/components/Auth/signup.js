import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../error';

const initState = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation:""
}

class Signup extends React.Component {
  state = { ...initState }

  clearState = ()=>{
    this.setState({ ...initState });
  }
  handleChange =(event) =>{
    const {name , value } = event.target;
    this.setState({ [name]: value});
  };

  handleSubmit =(event, signupUser) =>{
    event.preventDefault();
    signupUser().then(({ data })=>{
      console.log(data);
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      // eslint-disable-next-line
      this.clearState;
      this.props.history.push('/');
    })
  };

  validateForm = () =>{
    const {username, email, password, passwordConfirmation} = this.state;
    const isValid = !username || !email || !password || passwordConfirmation !== password
    return isValid;
  }

    render(){
      const {username, email, password, passwordConfirmation} = this.state;
      return  (
        <div className ="App">
          <h2 className= "App">Signup</h2>
          <Mutation mutation={SIGNUP_USER} variables ={{ username, email, password }}>
            {(signupUser, {data, loading, error})=>{
                return (
                  <form className="form" onSubmit= {event =>  this.handleSubmit(event, signupUser)}>
                    <input type="text" name="username" placeholder="Enter Username" onChange ={this.handleChange} value= {username} />
                    <input type="email" name="email" placeholder="Enter the email Id" onChange ={this.handleChange} value= {email} />
                    <input type="password" name="password" placeholder="Enter the password" onChange ={this.handleChange} value= {password} />
                    <input type="password" name="passwordConfirmation" placeholder="Re-enter the password" onChange ={this.handleChange} value= {passwordConfirmation} />
                    <button type="Submit" className="button-primary" disabled={ loading || this.validateForm()}>Submit</button>
                    {error && <Error error={error} />}
                  </form>
                )
              }
            }
          </Mutation>
        </div>
      );
    }
}

export default withRouter(Signup);
