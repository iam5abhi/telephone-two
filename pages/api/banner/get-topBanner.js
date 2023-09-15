import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {

  const results = await xata.db.topBanner.getAll();
  res.send(results);
};

export default handler;