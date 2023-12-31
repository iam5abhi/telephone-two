// Generated by Xata Codegen 0.18.0. Please do not edit.
import { buildClient } from "@xata.io/client";
/** @typedef { import('./types').SchemaTables } SchemaTables */
/** @type { SchemaTables } */
const tables = [
  {
    name: "contacts",
    columns: [
      { name: "firstName", type: "string" },
      { name: "lastName", type: "string" },
      { name: "phoneNumber", type: "string" },
      { name: "location", type: "string" },
      { name: "email", type: "string" },
      { name: "imageUrl", type: "string" },
    ],
  },
];

/** @type { import('@xata.io/client').ClientConstructor<{}> } */
const DatabaseClient = buildClient();
const defaultOptions = {
  databaseURL:"https://sandeep-kumar-s-workspace-b4csci.us-east-1.xata.sh/db/new-telephone",
  apiKey: "xau_XvyMWwkYvU4NLvCLzoFcv9r4OVvi62FCf", // Replace with your actual API key
};
/** @typedef { import('./types').DatabaseSchema } DatabaseSchema */
/** @extends DatabaseClient<DatabaseSchema> */
export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}
let instance = undefined;
/** @type { () => XataClient } */
export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};

