import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {

  const results = await xata.db.whatsappNumber.getAll();
  res.send(results[0].Phonenumber);
};

export default handler;