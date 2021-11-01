const express = require("express");
const router = express.Router();
const operations = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await operations.listContacts();
    res.json({ status: 200, type: "success", data: contactsList });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await operations.getContactById(id);
    res.json({ status: 200, type: "success", data: contact });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
