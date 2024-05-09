import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";
import { decodeTagOpaqueId } from "../xforms/id.js";

export default async function createFaq(context, input) {
  console.log("input ", input);
  const { collections, userId } = context;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  const { Faqs } = collections;
  let { question, answer, description, tagIds, tagTitle } = input;
  const createdAt = new Date();
  const newFaq = {
    _id: Random.id(),
    createdAt: new Date(),
    question,
    isDeleted: false,
    isVisible: true,
    answer,
    description,
    tagIds: decodeTagOpaqueId(tagIds),
    tagTitle,
    updatedAt: new Date(),
  };
  //   console.log("newFaq", newFaq);
  let newFaqResponse = await Faqs.insertOne(newFaq);
  if (newFaqResponse?.ops.length > 0) {
    return newFaqResponse?.ops[0];
  }
}
