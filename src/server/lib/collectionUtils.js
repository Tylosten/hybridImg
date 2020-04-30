import { connectDB } from '../config/database';
import { v4 as uuid } from 'uuid';

class collectionUtils {
  constructor(collectionName, attributes, required = [], uniq = []) {
    this.collectionName = collectionName;
    if (attributes.includes('id')) {
      console.warning(
        'Collection attributes from collectionUtils should not contain \'id\', removed.'
      );
      attributes = attributes.filter(a => a !== 'id');
    }
    this.attributes = attributes;
    this.required = required;
    this.uniq = uniq;
  }

  all = async () => {
    const db = await connectDB();
    return await db
      .collection(this.collectionName)
      .find()
      .toArray();
  };

  findOne = async filter => {
    const db = await connectDB();
    const collection = db.collection(this.collectionName);
    const element = await collection.findOne(filter);
    return element;
  };

  find = async filter => {
    const db = await connectDB();
    const collection = db.collection(this.collectionName);
    const element = await collection.find(filter);
    return element;
  };

  get = async id => {
    return this.findOne({ id });
  };

  add = async element => {
    const db = await connectDB();
    const collection = db.collection(this.collectionName);
    const missing = this.required.filter(requiredAttr => {
      return !element[requiredAttr];
    });
    if (missing.length > 0) {
      throw new Error(
        `Attribut(s) requis manquant(s) : ${missing.join()} (collection ${
          this.collectionName
        })`
      );
    }
    const notUniq = this.uniq.filter(uniqAttr => {
      if (element[uniqAttr]) {
        const search = {};
        search[uniqAttr] = element[uniqAttr];
        return !!collection.findOne(search);
      }
      return false;
    });
    if (notUniq.length > 0) {
      throw new Error(
        `Unicité non-respectée : ${notUniq.join()} (collection ${
          this.collectionName
        })`
      );
    }

    const tmp = {
      id: uuid(),
    };
    this.attributes.map(attribute => {
      tmp[attribute] = element[attribute];
    });
    await collection.insertOne(tmp);
    return tmp;
  };

  remove = async id => {
    const db = await connectDB();
    const collection = db.collection(this.collectionName);
    await collection.deleteOne({ id: id });
  };

  update = async element => {
    const db = await connectDB();
    const collection = db.collection(this.collectionName);

    const notUniq = this.uniq.filter(uniqAttr => {
      if (element[uniqAttr]) {
        const search = {};
        search[uniqAttr] = element[uniqAttr];
        return !!collection.findOne(search);
      }
      return false;
    });
    if (notUniq.length > 0) {
      throw new Error(
        `Unicité non-respectée : ${notUniq.join()} (collection ${
          this.collectionName
        })`
      );
    }

    const tmp = {};
    this.attributes.map(attribute => {
      if (element[attribute]) {
        tmp[attribute] = element[attribute];
      }
    });

    if (tmp) {
      await collection.updateOne({ id: element.id }, { $set: tmp });
    }
    return await collection.findOne({ id: element.id });
  };

  checkOwner = async (id, userId) => {
    const element = await this.get(id);
    return element.user === userId;
  };
}

export const gridUtils = new collectionUtils(
  'grids',
  ['name', 'user', 'lineThemes', 'colThemes'],
  ['user'],
  ['name']
);

export const cellUtils = new collectionUtils(
  'cells',
  ['grid', 'position', 'hybrids'],
  ['grid'],
  []
);

export const hybridUtils = new collectionUtils(
  'hybrids',
  ['name', 'user', 'tags', 'url'],
  ['user', 'url'],
  []
);

export const tagUtils = new collectionUtils('tags', ['name'], [], ['name']);
