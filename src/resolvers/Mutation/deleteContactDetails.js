import ReactionError from "@reactioncommerce/reaction-error";

export default async function deleteContactDetails(parent, args, context, info) {
    // console.log("args", args);
    const {
        userId,
      } = context;
      if (!userId ) {
        throw new ReactionError("access-denied", "Please login first");
      }
    let deleteContactDetailResp = await context.mutations.deleteContactDetails(context, args);
    return deleteContactDetailResp;
  }
  