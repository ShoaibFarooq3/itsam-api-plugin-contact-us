import { decodeTagOpaqueId, encodeProductOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function listCompanyDirectory(context, args) {
  console.log("here args", args);
  const {
    collections: { CompanyDirectory },
  } = context;

  let { itemPerPage, PageNumber,  searchQuery } = args;
  let filters = { isVisible: true };

  if (searchQuery) {
    filters.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { post: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
    ];
  }
  console.log("filters", filters);

  let itemsPerPage = itemPerPage ? itemPerPage : 10; // Number of items to display per page
  PageNumber = PageNumber ? PageNumber : 1;
  let skipAmount = (PageNumber - 1) * itemsPerPage;
  let totalCount = await CompanyDirectory.countDocuments(filters);
  let responseCompanyDirectory = await CompanyDirectory.find(filters)
    .skip(skipAmount)
    .limit(itemsPerPage)
    .toArray();
  console.log("responseCompanyDirectory", responseCompanyDirectory);

  if (responseCompanyDirectory.length > 0) {
    return {
      totalCount,
      data: responseCompanyDirectory,
    };
  } else {
    return {
      totalCount: 0,
      data: null,
    };
  }
}
