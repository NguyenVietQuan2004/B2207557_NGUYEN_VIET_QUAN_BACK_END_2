import { ObjectId } from 'mongodb';

class TheoDoiMuonSachService {
  constructor(client) {
    this.TheoDoiMuonSach = client.db().collection('theodoimuonsach');
  }

  extractMuonSachData(payload) {
    const muonsach = {
      madocgia: payload.madocgia,
      masach: payload.masach,
      ngaymuon: payload.ngaymuon ? new Date(payload.ngaymuon) : new Date(),
      ngaytra: payload.ngaytra ? new Date(payload.ngaytra) : null,
    };

    Object.keys(muonsach).forEach(
      (key) => muonsach[key] === undefined && delete muonsach[key],
    );

    return muonsach;
  }

  async createMuonSach(payload) {
    const muonsach = this.extractMuonSachData(payload);
    console.log(payload);

    if (!muonsach.madocgia || !muonsach.masach) {
      throw new Error('Mã độc giả và mã sách là bắt buộc.');
    }

    const result = await this.TheoDoiMuonSach.insertOne(muonsach);
    return { id: result.insertedId, ...muonsach };
  }

  async getAllMuonSach() {
    return await this.TheoDoiMuonSach.find({}).toArray();
  }

  async getMuonSachById(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.TheoDoiMuonSach.findOne({ _id: new ObjectId(id) });
  }

  async updateMuonSach(id, payload) {
    if (!ObjectId.isValid(id)) return null;
    const muonsach = this.extractMuonSachData(payload);

    const result = await this.TheoDoiMuonSach.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: muonsach },
      { returnDocument: 'after' },
    );

    return result;
  }

  async deleteMuonSach(id) {
    if (!ObjectId.isValid(id)) return null;
    return await this.TheoDoiMuonSach.deleteOne({ _id: new ObjectId(id) });
  }
  async getMuonSachByUserId(userId) {
    if (!ObjectId.isValid(userId)) return null;

    const records = await this.TheoDoiMuonSach.find({
      madocgia: userId,
    }).toArray();
    return records;
  }
}

export default TheoDoiMuonSachService;
