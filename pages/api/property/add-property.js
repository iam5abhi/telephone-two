// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { title, phoneNumber, ask_price, type, link, requirement,location } = req.body;
  await xata.db.property.create(req.body);
  res.end();
};

export default handler;
