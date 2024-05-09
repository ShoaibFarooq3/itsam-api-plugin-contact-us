import Random from "@reactioncommerce/random";

export default async function createCompanyDirectory(context, input) {
  const {
    collections: { CompanyDirectory },
  } = context;
  const {
    name,
    post,
    email,
    phone,
    extension
  } = input;

  const createdAt = new Date();

  const newDetail = {
    _id: Random.id(),
    name,
    post,
    email,
    phone,
    isDeleted: false,
    isVisible: true,
    updatedAt: createdAt,
    extension,
    createdAt,
  };
  let ContactDetailsResp = await CompanyDirectory.insertOne(newDetail);
  console.log("ContactDetailsResp", ContactDetailsResp);
  if (ContactDetailsResp?.ops.length > 0) {
    return ContactDetailsResp?.ops[0];
  } else {
    return null;
  }
}
