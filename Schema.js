exports.typeDefs=`

type Recipe {

  id: ID
  name: String!
  category: String!
  description: String!
  instructions: String!
  createdDate: String
  likes: Int
  username: String

}

type User {

  id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorites: [Recipe]

}

type Token {
  token: String!
}

type Query {
  getAllRecipes: [Recipe!]!

  getCurrentUser: User!
}

type Mutation {

  addRecipe(data: addRecipeInput): Recipe!

  signinUser(user: signInUser): Token!

  signupUser(user: signUpUser): Token!
}

input signInUser{
  username: String!,
  password: String!
}

input signUpUser {
  username: String!,
  email: String!,
  password: String!
}

input addRecipeInput {

  name: String!,
  category: String!,
  description: String!,
  instructions: String!,
  username: String

}
`;
