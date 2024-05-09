import ReactionError from "@reactioncommerce/reaction-error";
import ObjectID from "mongodb";
import { decodeProductOpaqueId } from "../xforms/id.js";

export default async function deleteCompanyDirectory(context, args) {
  console.log("args in mutations:- ", args);
  let { _id } = args;
  const {
    collections: { CompanyDirectory },
    userId,
  } = context;
  let updateData = {
    isVisible: false,
    updatedAt: new Date(),
  };
  console.log("updateData", updateData);
  console.log("encodeProductOpaqueId(_id)", decodeProductOpaqueId(_id));
  let updateResponse = await CompanyDirectory.findOneAndUpdate(
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
