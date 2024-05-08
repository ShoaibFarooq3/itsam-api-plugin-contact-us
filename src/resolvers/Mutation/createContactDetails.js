import ReactionError from "@reactioncommerce/reaction-error";

export default async function createContactDetails(parent, {input}, context, info) {
    console.log("input", input);
    const {  userId } = context;
    if (!userId) {
      throw new ReactionError("access-denied", "Please login first");
    }
    let createContactDetailsResp = await context.mutations.createContactDetails(context, input);
    return createContactDetailsResp;
  }
  