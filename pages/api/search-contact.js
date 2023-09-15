import { getXataClient } from '../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { searchWord } = req.body;

  const results = await xata.search.all(searchWord);

  res.send(results);
};

export default handler;