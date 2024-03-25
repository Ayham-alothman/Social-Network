const {MongoClient, ObjectId}=require('mongodb');

async function getAllCommints(postid){
    const Client=new MongoClient(process.env.Url);
    try{
      const Db=Client.db('chatapp');
      const Coll= Db.collection('commints');
      const resultData= await Coll.find({ownpostid:postid}).toArray(); 
      if(resultData){return resultData;}   
    }
    catch(e){ throw e}
    finally{await Client.close()}
}

async function saveCommintModel(idowncommint,idownpost,text){
  const Client=new MongoClient(process.env.Url);
  const FilterUser={_id:ObjectId(idowncommint)};
  const FliterPost={_id:ObjectId(idownpost)};
  try{
    const Db=Client.db('chatapp');
    const CollUser=Db.collection('users');
    const Collpost=Db.collection('post');
    const CollCommints=Db.collection('commints');
    const dataUser=CollUser.findOne(FilterUser);
    const dataPost=Collpost.findOne(FliterPost);
    if(dataUser&&dataPost){
      const dataInsert={
        text:text,
        owncommint:idowncommint,
        postid:idownpost
       }
      const Data= await CollCommints.insertOne(dataInsert);
      if(Data.acknowledged&&Data.insertedId){
        await Collpost.updateOne(FliterPost,{$push:{comments:Data.insertedId}});
        return;
      }
      else if(!Data.acknowledged){throw Error('issue in save commint')}

    }
    else if(!dataUser||!dataPost){throw Error('there miss data')}
  }
  catch(e){throw Error(e)}
  finally{await Client.close();}
}

module.exports={getAllCommints,saveCommintModel}