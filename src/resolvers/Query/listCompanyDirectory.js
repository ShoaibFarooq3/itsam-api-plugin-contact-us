export default async function listCompanyDirectory(
  parent,
  args,
  context,
  info
) {
  // console.log("input", args);

  let listCompanyDirectoryResponse = await context.queries.listCompanyDirectory(
    context,
    args
  );
  return listCompanyDirectoryResponse;
}
