export default async function createFaq(parent, { input }, context, info) {
  // console.log("input", input);
  let newSavedProduct = await context.mutations.createFaq(context, input);

  return newSavedProduct;
}
