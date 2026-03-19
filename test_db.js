const mongoose = require('mongoose');

async function test() {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("collections:", collections.map(c => c.name));
    
    // Check if site_configs or siteconfigs exists
    const collName = collections.find(c => c.name.toLowerCase().includes('site'))?.name;
    if (collName) {
        const data = await db.collection(collName).find().toArray();
        console.log(`Data in ${collName}:`, data);
    }
    process.exit(0);
}
test();
