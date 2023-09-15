
import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
const { id } = req.body;
  const results = await xata.db.property.read(id);
  res.send(results);
};

export default handler;