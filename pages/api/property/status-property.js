import { getXataClient } from '../../../src/xata';
const xata = getXataClient();

const handler = async (req, res) => {
  const { data,status } = req.body;
  console.log(req.body)
  const record = await xata.db.property.update(data.id,{
    link:data.link,
    phoneNumber:data.phoneNumber,
    status:status,
    title:data.title,
    type: data.type,
    ask_price:data.ask_price,
    requirement:data.requirement,
    location:data.location,
    status:status, 
  });

  res.send(record);
};

export default handler;