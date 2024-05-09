export default async function getFaqsById(parent, args, context, info) {
    // console.log("input", args);
    
    let getFaqsByIdResponse = await context.queries.getFaqsById(context, args);
    return getFaqsByIdResponse;
  }
  