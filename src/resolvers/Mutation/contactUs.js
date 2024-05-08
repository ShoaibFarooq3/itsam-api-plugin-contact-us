export default async function contactUs(parent, args, context, info) {
    console.log("input", args);
    let newContactUs = await context.mutations.contactUs(context, args);
    return newContactUs;
  }
  