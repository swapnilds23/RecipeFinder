import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../error';

const initState = {
  username: "",
  password: ""
}

class Signin extends React.Component {

state ={...initState}

clearState = ()=>{
  this.setState({ ...initState });
}
handleChange =(event) =>{
  const {name , value } = event.target;
  this.setState({ [name]: value});
};

  handleSubmit =(event, signinUser) =>{
    event.preventDefault();
    signinUser().then(({ data })=>{
      console.log(data);
      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch();
      // eslint-disable-next-line
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () =>{
    const {username, password} = this.state;
    const isValid = !username || !password
    return isValid;
  }

    render(){
      const {username, password} = this.state;
      return  (
        <div className ="App">
          <h2 className= "App">Login</h2>
          <Mutation mutation={SIGNIN_USER} variables ={{ username, password }}>
            {(signinUser, {data, loading, error})=>{
                return (
                  <form className="form" onSubmit= {event =>  this.handleSubmit(event, signinUser)}>
                    <input type="text" name="username" placeholder="Enter Username" onChange ={this.handleChange} value= {username} />
                    <input type="password" name="password" placeholder="Enter the password" onChange ={this.handleChange} value= {password} />
                    <button type="Submit" className="button-primary" disabled={ loading || this.validateForm()}>Submit</button>
                    {error && <Error error={error} />}
                  </form>
                )
              }
            }
          </Mutation>
        </div>
      )
    }
}

export default withRouter(Signin);
