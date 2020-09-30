const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'geospoc_dev';

const user = {
  name: "Admin User",
  email: "root@admin.co",
  password: "$2a$08$WLEVROtNCEFXFCZ9leM1hOCoPf76GVE83UQMFL/otZvlQSjslcu.q",
  createdOn: new Date(),
  isEmailApproved: true,
  role: "ADMIN"
}

// Use connect method to connect to the server
async function up () {
  // Write migration here
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db(dbName);
        let collection = db.collection('users');
        let res = await collection.insertOne(user);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}


/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }

    try {
        const db = client.db(dbName);
        let collection = db.collection('users');
        let res = await collection.deleteOne({email: user.email});
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

module.exports = { up, down };
