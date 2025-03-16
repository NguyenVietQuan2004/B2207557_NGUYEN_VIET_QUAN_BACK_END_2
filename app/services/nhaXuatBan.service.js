import { ObjectId } from 'mongodb';

class NhaXuatBanService {
  constructor(client) {
    this.NhaXuatBan = client.db().collection('nhaxuatbans');
  }

  extractNhaXuatBanData(payload) {
    const nhaxuatban = {
      tennxb: payload.tennxb,
      diachi: payload.diachi,
      createdAt: new Date(),
    };

    Object.keys(nhaxuatban).forEach(
      (key) => nhaxuatban[key] === undefined && delete nhaxuatban[key],
    );
    return nhaxuatban;
  }

  async create(payload) {
    const nhaxuatban = this.extractNhaXuatBanData(payload);
    if (!nhaxuatban.tennxb) throw new Error('Tên nhà xuất bản là bắt buộc');
    const result = await this.NhaXuatBan.insertOne(nhaxuatban);
    return { id: result.insertedId, ...nhaxuatban };
  }

  async getAll() {
    return await this.NhaXuatBan.find().toArray();
  }

  async getById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.NhaXuatBan.findOne({ _id: new ObjectId(id) });
  }

  async update(id, payload) {
    if (!ObjectId.isValid(id)) return null;
    const nhaxuatban = this.extractNhaXuatBanData(payload);
    const result = await this.NhaXuatBan.updateOne(
      { _id: new ObjectId(id) },
      { $set: nhaxuatban },
    );
    return result.modifiedCount > 0;
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) return null;
    const result = await this.NhaXuatBan.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export default NhaXuatBanService;
