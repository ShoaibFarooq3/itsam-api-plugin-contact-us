import ReactionError from "@reactioncommerce/reaction-error";

export default async function deleteCompanyDirectory(parent, args, context, info) {
    // console.log("args", args);
    const {
        userId,
      } = context;
      if (!userId ) {
        throw new ReactionError("access-denied", "Please login first");
      }
    let deleteCompanyDirectoryResp = await context.mutations.deleteCompanyDirectory(context, args);
    return deleteCompanyDirectoryResp;
  }
  