const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");
const router = express.Router();
const operations = require("../../model/index");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(6).max(15).required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await operations.listContacts();
    res.status(200).json({ status: "success", data: contactsList });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.getContactById(contactId);
    if (!contact) {
      throw new NotFound();
    }
    res.status(200).json({ status: "success", data: contact });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    const newContact = await operations.addContact(req.body);
    res.status(201).json({ status: "success", data: newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest("missing fields");
    }
    const { contactId } = req.params;
    const updateContact = await operations.updateContact(contactId, req.body);
    if (!updateContact) {
      throw new NotFound("Not found");
    }
    res.status(200).json({ status: "success", data: updateContact });
  } catch (error) {
    next(error);
  }

  res.json({ message: "template message" });
});

module.exports = router;
