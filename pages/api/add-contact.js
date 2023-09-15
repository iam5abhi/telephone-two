// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  await xata.db.contacts.create(req.body);
  res.end();
};

export default handler;
