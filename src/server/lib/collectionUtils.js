import { connectDB } from '../config/database';

const collectionUtils = (collectionName, attributes) => {
  const add = async element => {
    const tmp = {};
    attributes.map(attribute => {
      tmp[attribute] = element[attribute];
    });
    const db = await connectDB();
    const collection = db.collection(collectionName);
    await collection.insertOne(tmp);
    return element;
  };

  const remove = async id => {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    await collection.deleteOne({ id: id });
  };

  const update = async element => {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const tmp = {};
    attributes.map(attribute => {
      console.log('ATTRIBUTE', attribute, element[attribute]);
      if (attribute !== 'id' && element[attribute]) {
        tmp[attribute] = element[attribute];
      }
    });

    await collection.updateOne({ id: element.id }, { $set: tmp });
  };

  return { add, remove, update };
};

export default collectionUtils;
