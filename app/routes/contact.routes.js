// file routes/contact.routes.js

import express from "express";
import * as contacts from "../controllers/contact.controller.js"; // Sử dụng import thay vì require

const router = express.Router();

router
  .route("/")
  .get(contacts.findAll)
  .post(contacts.create)
  .delete(contacts.deleteAll);

router.route("/favorite").get(contacts.findAllFavorite);

router
  .route("/:id")
  .get(contacts.findOne)
  .put(contacts.update)
  .delete(contacts.deleteItem); // Đảm bảo thay đổi delete thành deleteItem

export default router; // Sử dụng export default thay vì module.exports
