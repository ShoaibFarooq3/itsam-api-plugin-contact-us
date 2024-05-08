import Random from "@reactioncommerce/random";

export default async function createContactDetails(context, input) {
  const {
    collections: { ContactDetails },
  } = context;
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

  //   const shop = await Shops.findOne({ shopType: "primary" });
  //   console.log(shop);
  //   if (!shop) throw new ReactionError("not-found", "Shop not found");

  const createdAt = new Date();

  const newDetail = {
    _id: Random.id(),
    name,
    address,
    country,
    city,
    telephoneNumber,
    faxNumber,
    email,
    website,
    createdAt,
    isDeleted: false,
    isVisible: true,
    updatedAt: createdAt,
  };
  let ContactDetailsResp = await ContactDetails.insertOne(newDetail);
  console.log("ContactDetailsResp", ContactDetailsResp);
  if (ContactDetailsResp?.ops.length > 0) {
    return ContactDetailsResp?.ops[0];
  } else {
    return null;
  }
}
