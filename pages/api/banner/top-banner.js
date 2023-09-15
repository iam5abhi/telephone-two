import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { Link, image } = req.body;
  await xata.db.topBanner.create({ Link:Link , image:image });
  res.end();
  res.end();
};

export default handler;
