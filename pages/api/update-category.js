
import { getXataClient } from '../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
const { id, category } = req.body;
  const results = await xata.db.categories.createOrUpdate(id, { category:category });
  res.send(results);
};

export default handler;