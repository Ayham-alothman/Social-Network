const {MongoClient, ObjectId}=require('mongodb');

async function savePost(dataIncome){

    const Client=new MongoClient(process.env.Url);
    try{
        const Db=Client.db('chatapp');
        const Coll=Db.collection('post');
        
        const Data=await Coll.insertOne({...dataIncome,likes:[],comments:[]});
        if(Data.acknowledged){return}
    }
    catch(e){return e}
    finally{await Client.close()}
}

async function deletePost(idpost,idowner){
    const Client=new MongoClient(process.env.Url);
    try{
        
        const Db=Client.db('chatapp');
        const Coll=Db.collection('post');
        const Filter={_id:ObjectId(idpost)}
        const Data= await Coll.findOne( Filter );
        if(Data.own===idowner){console.log('set')
            const Bool=await Coll.deleteOne(Filter);
            
            if(Bool){return}
        }
        else if(Data.own!==idowner){
            throw Error(`you do't owner post`)
        }
    }
    catch(e){ throw e}
    finally{await Client.close()}
}

async function getOwnPosts(ownid){console.log(ownid)
    const Client =new MongoClient(process.env.Url);
    const Filter={own:ownid}
    try{
        const Db=Client.db('chatapp');
        const Coll=Db.collection('post');
        const Data=await Coll.find(Filter).toArray();console.log(Data)
        if(Data){return Data}
        else if(!Data){throw Error('found erorr')}
    
    }
    catch(e){throw e}
    finally{await Client.close();}
}

module.exports={savePost,deletePost,getOwnPosts}