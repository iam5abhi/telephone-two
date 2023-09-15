import { getXataClient } from "../../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { Link, image } = req.body;
  await xata.db.buttomBanner.create({ Link:Link , image:image });
  res.end();
};

export default handler;
