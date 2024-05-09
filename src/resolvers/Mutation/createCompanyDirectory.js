import ReactionError from "@reactioncommerce/reaction-error";

export default async function createCompanyDirectory(parent, {input}, context, info) {
    console.log("input", input);
    const {  userId } = context;
    if (!userId) {
      throw new ReactionError("access-denied", "Please login first");
    }
    let createCompanyDirectoryResp = await context.mutations.createCompanyDirectory(context, input);
    return createCompanyDirectoryResp;
  }
  