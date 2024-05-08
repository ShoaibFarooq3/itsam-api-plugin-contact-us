import ReactionError from "@reactioncommerce/reaction-error";
import ObjectID from "mongodb";
import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function deleteContactDetails(context, args) {
  console.log("args in mutations:- ", args);
  let { _id } = args;
  const {
    collections: { ContactDetails, Accounts },
    userId,
  } = context;
  let updateData = {
    isVisible: false,
    updatedAt: new Date(),
  };
  console.log("updateData", updateData);
  const account = await Accounts.findOne(
    { _id: userId },
    { projection: { userId: 1 } }
  );
  console.log("account", account);
  if (!account) throw new ReactionError("not-found", "No account found");
  console.log("encodeProductOpaqueId(_id)", decodeProductOpaqueId(_id));
  let updateResponse = await ContactDetails.findOneAndUpdate(
    {
      _id: decodeProductOpaqueId(_id),
    },
    {
      $set: updateData, // fields to update
    }
  );
  console.log("updatedAccount:-", updateResponse);
  if (updateResponse?.value) {
    return true;
  } else {
    return false;
  }
}
