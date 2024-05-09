import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
export default async function updateCompanyDirectory(context, args) {
  console.log("args:- ", args);
  let { input, _id } = args;
  const { collections } = context;
  const { CompanyDirectory } = collections;

  const {
    name,
    post,
    email,
    extension,
    phone,
  } = input;
  console.log("encodeProductOpaqueId(_id)", decodeProductOpaqueId(_id));
  const currentProduct = await CompanyDirectory.findOne({
    _id: decodeProductOpaqueId(_id),
  });
  console.log("currentProduct", currentProduct);
  if (!currentProduct)
    throw new ReactionError("not-found", "Details not found");
  console.log("currentProduct", currentProduct);
  if (name) {
    currentProduct.name = name;
  }
  if (post) {
    currentProduct.post = post;
  }
  if (extension) {
    currentProduct.extension = extension;
  }
  if (phone) {
    currentProduct.phone = phone;
  }
  if (email) {
    currentProduct.email = email;
  }
  currentProduct.updatedAt = new Date();
  console.log("current updated product", currentProduct);
  let { value: updatedContactResp } = await CompanyDirectory.findOneAndUpdate(
    { _id: decodeProductOpaqueId(_id) }, // search filter
    {
      $set: currentProduct, // fields to update
    },
    {
      returnOriginal: false,
    }
  );
  console.log("updatedContactResp", updatedContactResp);
  if (updatedContactResp) {
    return {
      status: true,
      message: "Company Directory updated sucessfully",
      data: updatedContactResp,
    };
  } else {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
}
