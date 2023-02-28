import { create } from 'ipfs-http-client';


export const uploadfile = async(data)=>{
  const data1= JSON.stringify(data);
  console.log("from function :" + data1);
    const client = create(new URL('http://127.0.0.1:5002'))
    // const client = create()
    const result = await client.add(data1);
    // console.log("from function :" + result.cid);
    // return Promise.resolve(result);
    return result;
  }

  export const getFile = async(cid) =>{
    const client = create(new URL('http://127.0.0.1:5002'))
    const bytes = [];
    for await (const chunk of client.cat(cid)){
        bytes.push(chunk);
    }
    return Buffer.concat(bytes).toString();
  }