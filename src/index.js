import { createRequire } from "module";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
import resolvers from "./resolvers/index.js";
import schemas from "./schemas/index.js";
import mutations from "./mutations/index.js";
import queries from "./queries/index.js";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");

// console.log("Schema here", schemas);
/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {Object} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    collections: {
      ContactUs: {
        name: "ContactUs",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
      Faqs: {
        name: "Faqs",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
      ContactDetails: {
        name: "ContactDetails",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
      CompanyDirectory: {
        name: "CompanyDirectory",
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
    },
    graphQL: {
      // schemas: [schemas],
      schemas,
      resolvers,
    },
    mutations,
    queries
  });
}
