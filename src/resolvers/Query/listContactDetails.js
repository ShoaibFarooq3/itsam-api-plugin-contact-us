export default async function listContactDetails(parent, args, context, info) {
    // console.log("input", args);
    
    let listContactDetailsResponse = await context.queries.listContactDetails(context, args);
    return listContactDetailsResponse;
  }
  