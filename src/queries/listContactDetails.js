import { decodeTagOpaqueId, encodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function listContactDetails(context, args) {
  console.log("here args", args);
  const {
    collections: { ContactDetails },
  } = context;
  let { itemPerPage, PageNumber ,searchQuery} = args;
    let filters = { isVisible: true };
  //   // console.log("encodeTagOpaqueId(tagIds)", decodeTagOpaqueId(tagIds));
  //   // if (tagIds) {
  //   //   filters.tagIds = { $in: encodeTagOpaqueId(tagIds) };
  //   // }
  //   if (tagIds) {
  //     filters.tagIds = decodeTagOpaqueId(tagIds);
  //   }
    if (searchQuery) {
      filters.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { address: { $regex: searchQuery, $options: "i" } },
        { country: { $regex: searchQuery, $options: "i" } },
        { city: { $regex: searchQuery, $options: "i" } },
      ];
    }
    console.log("filters", filters);

    let itemsPerPage = itemPerPage ? itemPerPage : 10; // Number of items to display per page
    PageNumber = PageNumber ? PageNumber : 1;
    let skipAmount = (PageNumber - 1) * itemsPerPage;
    let totalCount = await ContactDetails.countDocuments(filters);
    let responseContact = await ContactDetails.find(filters)
      .skip(skipAmount)
      .limit(itemsPerPage)
      .toArray();
  //   // Iterate through each object in responseFaqs and decode _id
  //   // responseFaqs = responseFaqs.map((faq) => {
  //   //   const decodedId = encodeProductOpaqueId(faq._id); // Assuming _id is an ObjectId
  //   //   return { ...faq, _id: decodedId };
  //   // });
  //   // console.log("responseFaqs", responseFaqs);

    if (responseContact.length > 0) {
      return {
        totalCount,
        data: responseContact,
      };
    } else {
      return {
        totalCount: 0,
        data: null,
      };
    }
}
