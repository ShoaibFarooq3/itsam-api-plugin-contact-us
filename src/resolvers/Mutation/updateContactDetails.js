import ReactionError from "@reactioncommerce/reaction-error";

export default async function updateContactDetails(parent, args, context, info) {
    // console.log("input", input);
    const { userId } = context;
    if (!userId) {
      throw new ReactionError("access-denied", "Please login first");
    }
    let updateContactDetailsResp = await context.mutations.updateContactDetails(context, args);
  
    return updateContactDetailsResp;
  }
  