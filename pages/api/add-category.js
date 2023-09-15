import { getXataClient } from "../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { category } = req.body;
  await xata.db.categories.create({ category:category });
  res.end();
};

export default handler;
