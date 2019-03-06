//User Authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn })
}

exports.resolvers={
  Query: {

     getAllRecipes: async (parent,args, { Recipe },info)=>{
       const allRecipes = await Recipe.find();
       return allRecipes;
     },

     getCurrentUser: async(parent, args, {currentUser, User}, info)=>{
       if(!currentUser){
          return null;
       }
       const user = await User.findOne({username: currentUser.username})
       .populate({
          path: 'favorites',
          model: 'Recipe'
       });
       return user;
     }
 },

  Mutation : {
      addRecipe: async(parent, args, {Recipe} ,info) =>{
        const newRecipe = await new Recipe({
          ...args.data
        }).save();

        return newRecipe;
      },

      signinUser: async(parent, args, {User}, info)=> {
        const { username, password } = args.user;

        const user = await User.findOne({ username });

        if(!user){
            throw new Error('User does not exist');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
          throw new Error('Invalid Password');
        }

        return {token: createToken( user , process.env.SECRET, '1hr')};
      },

      signupUser: async(parent, args, { User }, info)=>{

        const { username } = args.user;

        const user = await User.findOne({ username });

        if(user){
            throw new Error('User already exist');
        }
        const newUser = await new User ({
          ...args.user
        }).save();
        return {token: createToken( newUser , process.env.SECRET, '1hr')};
      }

  }
};
