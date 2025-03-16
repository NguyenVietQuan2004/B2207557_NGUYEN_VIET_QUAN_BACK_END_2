import { ObjectId } from 'mongodb';

class SachService {
  constructor(client) {
    this.Sach = client.db().collection('sachs');
  }

  extractSachData(payload) {
    const sach = {
      tensach: payload.tensach,
      dongia: payload.dongia,
      soquyen: payload.soquyen,
      namxuatban: payload.namxuatban,
      manxb: payload.manxb ? new ObjectId(payload.manxb) : null,
      createdAt: new Date(),
    };

    Object.keys(sach).forEach(
      (key) => sach[key] === undefined && delete sach[key],
    );
    return sach;
  }

  async create(payload) {
    const sach = this.extractSachData(payload);
    if (!sach.tensach || !sach.dongia || !sach.soquyen) {
      throw new Error('Thông tin sách không đầy đủ');
    }
    const result = await this.Sach.insertOne(sach);
    return { id: result.insertedId, ...sach };
  }

  async getAll() {
    return await this.Sach.find().toArray();
  }

  async getById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.Sach.findOne({ _id: new ObjectId(id) });
  }
  async getByPublisherId(publisherId) {
    if (!ObjectId.isValid(publisherId)) return [];
    return await this.Sach.find({ manxb: new ObjectId(publisherId) }).toArray();
  }

  async update(id, payload) {
    if (!ObjectId.isValid(id)) return null;
    const sach = this.extractSachData(payload);
    const result = await this.Sach.updateOne(
      { _id: new ObjectId(id) },
      { $set: sach },
    );
    return result.modifiedCount > 0;
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    const result = await this.Sach.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default SachService;
