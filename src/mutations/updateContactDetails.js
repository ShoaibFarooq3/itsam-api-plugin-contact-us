import { decodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
export default async function updateContactDetails(context, args) {
  console.log("args:- ", args);
  let { input, _id } = args;
  const { collections } = context;
  const { ContactDetails } = collections;

  const {
    name,
    address,
    country,
    city,
    telephoneNumber,
    faxNumber,
    email,
    website,
  } = input;
  console.log("encodeProductOpaqueId(_id)", decodeProductOpaqueId(_id));
  const currentProduct = await ContactDetails.findOne({
    _id: decodeProductOpaqueId(_id),
  });
  console.log("currentProduct", currentProduct);
  if (!currentProduct)
    throw new ReactionError("not-found", "Details not found");
  console.log("currentProduct", currentProduct);
  if (name) {
    currentProduct.name = name;
  }
  if (address) {
    currentProduct.address = address;
  }
  if (country) {
    currentProduct.country = country;
  }
  if (city) {
    currentProduct.city = city;
  }
  if (telephoneNumber) {
    currentProduct.telephoneNumber = telephoneNumber;
  }
  if (faxNumber) {
    currentProduct.faxNumber = faxNumber;
  }
  if (email) {
    currentProduct.email = email;
  }
  if (website) {
    currentProduct.website = website;
  }
  currentProduct.updatedAt = new Date();
  console.log("current updated product", currentProduct);
  let { value: updatedContactResp } = await ContactDetails.findOneAndUpdate(
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
      message: "Contact Detail updated sucessfully",
      data: updatedContactResp,
    };
  } else {
    return {
      status: false,
      message: "Something went wrong",
    };
  }
}
