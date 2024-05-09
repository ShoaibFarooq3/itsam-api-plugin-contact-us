export default async function deleteFaq(parent, args, context, info) {
  // console.log("args", args);
  let deleteFaqResp = await context.mutations.deleteFaq(context, args);
  return deleteFaqResp;
}
