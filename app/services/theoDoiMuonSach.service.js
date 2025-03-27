import { ObjectId } from 'mongodb';
import SachService from './sach.service.js';
class TheoDoiMuonSachService {
  constructor(client) {
    this.TheoDoiMuonSach = client.db().collection('theodoimuonsach');
    this.SachService = new SachService(client);
  }

  extractMuonSachData(payload) {
    const muonsach = {
      madocgia: payload.madocgia,
      masach: payload.masach,
      ngaymuon: payload.ngaymuon ? new Date(payload.ngaymuon) : new Date(),
      ngaytra: payload.ngaytra ? new Date(payload.ngaytra) : null,
    };

    return muonsach;
  }

  async createMuonSach(payload) {
    const muonsach = this.extractMuonSachData(payload);

    if (!muonsach.madocgia || !muonsach.masach) {
      throw new Error('Mã độc giả và mã sách là bắt buộc.');
    }
    const sach = await this.SachService.getById(muonsach.masach);

    if (!sach || sach.soquyen <= 0) {
      throw new Error('Sách đã hết số lượng.');
    }

    const result = await this.TheoDoiMuonSach.insertOne(muonsach);
    await this.SachService.update(muonsach.masach, {
      $inc: { soquyen: -1 },
    });
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

    const muonSach = await this.TheoDoiMuonSach.findOne({
      _id: new ObjectId(id),
    });

    if (!muonSach) {
      throw new Error('Không tìm thấy thông tin mượn sách.');
    }

    const sach = await this.SachService.getById(muonSach.masach);

    if (!sach) {
      throw new Error('Không tìm thấy sách để cập nhật số lượng.');
    }

    await this.SachService.update(muonSach.masach, {
      soquyen: sach.soquyen + 1,
    });

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
