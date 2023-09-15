import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {
  await xata.db.location.create(req.body);
  res.end();
};

export default handler;
