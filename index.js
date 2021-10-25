const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require('mongodb').ObjectId

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// user: user1
// pass: 7JhHwEMEoBpuC9kL

const uri =
  "mongodb+srv://user1:7JhHwEMEoBpuC9kL@cluster0.7s4l5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// client.connect(err => {
//   const collection = client.db("foodMaster").collection("users");
// //   console.log('wow');
// const user= {name:'rijon',email: 'rijon@gmail.com'}
//   collection.insertOne(user)
//   .then(()=>{
//       console.log('insert done');
//   })
// //   client.close();
// });

async function run() {
  try {
    await client.connect();
    const database = client.db("foodMaster");
    const userCollection = database.collection("users");
    // create a document to insert
    //   const doc = {
    //     name: "Ajmat Ullah Rijon",
    //     email: "ajmatrijon001@gmail.com",
    //   }
    //   const result = await userCollection.insertOne(doc);
    //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
    // }

    // get api 
    app.get('/users', async(req,res)=>{
        const cursor = userCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
    });

    // update api 
app.get('/users/:id',  async(req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const user = await userCollection.findOne(query);
    // console.log(id);
    res.json(user);
})

    // post api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await userCollection.insertOne(newUser);
    //   console.log("hitting the post", req.body);
    //   console.log("added user", result);
      res.json(result);
    });
    // delete api 
    // DELETE API
    app.delete('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        console.log('deleting user with id ', result);

        res.json(result);
    })
} finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
