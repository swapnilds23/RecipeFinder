import { gql } from 'apollo-boost';

//Recipes Queries
export const GET_ALL_RECIPES = gql`

    query{
      getAllRecipes {
        name
        description
        instructions
        username
      }
    }
`;

//REcipes Mutations

//User Queries
export const GET_CURRENT_USER = gql`

    query{
      getCurrentUser {
        username
        joinDate
        email
      }
    }
`;
//User Mutation
export const SIGNIN_USER = gql`

    mutation($username: String!, $password: String!){
      signinUser( user: {
                         username: $username
                         password: $password
                       }
      ) {
        token
      }
    }
`;

export const SIGNUP_USER = gql`

    mutation($username: String!, $email: String!, $password: String!){
       signupUser(user: {
                          username: $username
                          email: $email
                          password: $password
 	                      }
          ) {
            token
          }
    }
`;
