export default async function updateFaq(parent, { input }, context, info) {
    // console.log("input", input);
    let newUpdateProduct = await context.mutations.updateFaq(context, input);
  
    return newUpdateProduct;
  }
  