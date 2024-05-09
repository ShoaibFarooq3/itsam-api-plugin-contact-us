export default async function getAllFaqs(parent, args, context, info) {
    // console.log("input", args);
    
    let getAllFaqsResponse = await context.queries.getAllFaqs(context, args);
    return getAllFaqsResponse;
  }
  