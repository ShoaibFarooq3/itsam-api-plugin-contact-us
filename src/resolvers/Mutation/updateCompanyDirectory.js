import ReactionError from "@reactioncommerce/reaction-error";

export default async function updateCompanyDirectory(parent, args, context, info) {
    // console.log("input", input);
    const { userId } = context;
    if (!userId) {
      throw new ReactionError("access-denied", "Please login first");
    }
    let updateCompanyDirectoryResp = await context.mutations.updateCompanyDirectory(context, args);
  
    return updateCompanyDirectoryResp;
  }
  