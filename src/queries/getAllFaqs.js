import { decodeTagOpaqueId, encodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function getAllFaqs(context, args) {
  console.log("here args", args);
  const {
    collections: { Faqs },
    userId,
  } = context;
  // if (!userId) {
  //   throw new ReactionError("access-denied", "Please login first");
  // }
  let { itemPerPage, PageNumber, tagIds, searchQuery } = args;
  let filters = { isVisible: true };
  // console.log("encodeTagOpaqueId(tagIds)", decodeTagOpaqueId(tagIds));
  // if (tagIds) {
  //   filters.tagIds = { $in: encodeTagOpaqueId(tagIds) };
  // }
  if (tagIds) {
    filters.tagIds = decodeTagOpaqueId(tagIds);
  }
  if (searchQuery) {
    filters.$or = [
      { question: { $regex: searchQuery, $options: "i" } },
      { answer: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ];
  }
  console.log("filters", filters);

  let itemsPerPage = itemPerPage ? itemPerPage : 10; // Number of items to display per page
  PageNumber = PageNumber ? PageNumber : 1;
  let skipAmount = (PageNumber - 1) * itemsPerPage;
  let totalCount = await Faqs.countDocuments(filters);
  let responseFaqs = await Faqs.find(filters)
    .skip(skipAmount)
    .limit(itemsPerPage)
    .toArray();
  // Iterate through each object in responseFaqs and decode _id
  // responseFaqs = responseFaqs.map((faq) => {
  //   const decodedId = encodeProductOpaqueId(faq._id); // Assuming _id is an ObjectId
  //   return { ...faq, _id: decodedId };
  // });
  // console.log("responseFaqs", responseFaqs);

  if (responseFaqs.length > 0) {
    return {
      totalCount,
      Faqs: responseFaqs,
    };
  } else {
    return {
      totalCount: 0,
      Faqs: null,
    };
  }
}
