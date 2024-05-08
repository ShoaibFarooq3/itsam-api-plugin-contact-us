import ObjectID from "mongodb";
export default async function updateFaq(context, input) {
  console.log("input:- ", input);
  const { collections, userId } = context;
  const { Faqs } = collections;
  if (!userId) {
    throw new ReactionError("access-denied", "Please login first");
  }
  let {
    _id,
    question,
    answer,
    description,
    tagIds,
    tagTitle,
    isDeleted,
    isVisible,
  } = input;

  const currentProduct = await Faqs.findOne({
    _id: new ObjectID.ObjectId(_id),
  });
  if (!currentProduct)
    throw new ReactionError("not-found", "Product not found");
  const createdAt = new Date();
  console.log("currentProduct", currentProduct);
  if (question) {
    currentProduct.question = question;
  }
  if (answer) {
    currentProduct.answer = answer;
  }
  if (description) {
    currentProduct.description = description;
  }
  if (tagTitle) {
    currentProduct.tagTitle = tagTitle;
  }
  if (isDeleted) {
    currentProduct.isDeleted = isDeleted;
  }
  if (isVisible) {
    currentProduct.isVisible = isVisible;
  }
  if (tagIds && tagIds.length > 0) {
    currentProduct.tagIds = tagIds;
}
  currentProduct.updatedAt = new Date();
  console.log("current updated product", currentProduct);
  let updatedFaqResp = await Faqs.findOneAndUpdate(
    { _id: new ObjectID.ObjectId(_id) }, // search filter
    {
      $set: currentProduct, // fields to update
    },
    {
      returnOriginal: false,
    }
  );
  console.log("updatedFaqResp", updatedFaqResp);
  if (updatedFaqResp?.value) {
    return {
      status: true,
      message: "Faq updated sucessfully",
      updatedFaq: updatedFaqResp?.value,
    };
  } else {
    return {
      status: false,
      message: "Faq not updated",
      updatedFaq: null,
    };
  }
}
