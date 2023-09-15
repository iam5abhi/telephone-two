// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getXataClient } from "../../src/xata";
const xata = getXataClient();

const handler = async (req, res) => {

  const { id, specialization, category, Name, alternatePhoneNumber, phoneNumber, email, Link } = req.body;
  const results = await xata.db.contacts.createOrUpdate(id,{
    specialization,
    category,
    Name,
    alternatePhoneNumber:alternatePhoneNumber?alternatePhoneNumber:"",
    phoneNumber,
    email,
    Link,
  });
  res.send(results);
};

export default handler;
