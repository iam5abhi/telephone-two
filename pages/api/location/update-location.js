
import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
const { id, location } = req.body;
  const results = await xata.db.location.createOrUpdate(id, { location:location });
  res.send(results);
};

export default handler;