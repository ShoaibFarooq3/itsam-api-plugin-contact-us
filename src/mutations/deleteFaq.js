import ReactionError from "@reactioncommerce/reaction-error";
import ObjectID from "mongodb";
import { decodeTagOpaqueId } from "../xforms/id.js";

export default async function deleteFaq(context, args) {
  console.log("args in mutations:- ", args);
  let { _id } = args;
  const {
    collections: { Faqs, Accounts },
    userId,
  } = context;
  if (!userId ) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let updateData = {
    isVisible: false,
    updateAt: new Date(),
  };
  console.log("updateData", updateData);
  const account = await Accounts.findOne(
    { _id: userId },
    { projection: { userId: 1 } }
  );
  console.log("account", account);
  if (!account) throw new ReactionError("not-found", "No account found");
  let updateResponse = await Faqs.findOneAndUpdate(
    {
      _id: decodeTagOpaqueId(_id),
    },
    {
      $set: updateData, // fields to update
    }
  );
  console.log("updatedAccount", updateResponse);
  if (updateResponse?.value) {
    return true;
  } else {
    return false;
  }
}
