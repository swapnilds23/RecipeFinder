const   Mutation = {
    addRecipe: async(root, args, {Recipe} ,info) =>{
      const newRecipe = await new Recipe({

          args.data.name,
          args.data.description,
          args.data.category,
          args.data.instructions,
          args.data.username
      }).save();

      return newRecipe;
    }
  }

export {Mutation as default}
