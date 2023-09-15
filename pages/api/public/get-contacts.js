
import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
const { id } = req.body;
const users = await xata.db.contacts.filter({ category:id }).getMany();
  res.send(users);
};

export default handler;