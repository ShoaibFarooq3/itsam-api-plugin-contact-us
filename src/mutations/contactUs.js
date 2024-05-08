import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function contactUs(context, args) {
  const {
    collections: { Shops, ContactUs },
  } = context;
  const { firstName, lastName, email, Applications, Industry, emailMessage } =
    args.input;
  console.log({
    firstName,
    lastName,
    email,
    Applications,
    Industry,
    emailMessage,
  });
  const shop = await Shops.findOne({ shopType: "primary" });
  console.log(shop);
  if (!shop) throw new ReactionError("not-found", "Shop not found");

  const createdAt = new Date();

  const newForm = {
    _id: Random.id(),
    firstName,
    lastName,
    email,
    Applications,
    Industry,
    emailMessage,
    createdAt,
    updatedAt: createdAt,
  };
  console.log("newForm", newForm);
  const emailBody = `Name: ${firstName} ${lastName} \n Email: ${email} \n Applications: ${Applications} \n Industry: ${Industry} \n emailMessage: ${emailMessage} `;
  console.log("emailBody:- ", emailBody);
  console.log("shop email:- ", shop.emails[0].address);
  await ContactUs.insertOne(newForm);

  const sendEmailResult = await context.mutations.sendEmail(context, {
    to: shop.emails[0].address,
    data: emailBody,
    subject: "Contact us Form Submission",
    fromShop: shop,
  });
  console.log("sendEmailResult:- ", sendEmailResult);
  if (sendEmailResult) {
    return true;
  } else {
    throw new ReactionError("Failed", "Failed to send email. Try again later");
  }
}
