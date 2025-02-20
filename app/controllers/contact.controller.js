// file controllers.js
import ContactService from '../services/contact.service.js';
import ApiError from '../api-error.js';
import mongodb from '../utils/mongodb.util.js';
export const create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, 'Name cannot be empty'));
  }

  try {
    const contactService = new ContactService(mongodb.client);
    const document = await contactService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, 'An error occurred while creating the contact'),
    );
  }
};

export const findAll = async (req, res, next) => {
  let documents = [];

  try {
    const contactService = new ContactService(mongodb.client);
    const { name } = req.query;

    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, 'An error occurred while retrieving contacts'),
    );
  }

  return res.send(documents);
};

export const findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(mongodb.client);
    const document = await contactService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, 'Contact not found'));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`),
    );
  }
};

export const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, 'Data to update can not be empty'));
  }

  try {
    const contactService = new ContactService(mongodb.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, 'Contact not found'));
    }
    return res.send({ message: 'Contact was updated successfully' });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`),
    );
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const contactService = new ContactService(mongodb.client);
    const document = await contactService.deleteItem(req.params.id);
    if (!document) {
      return next(new ApiError(404, 'Contact not found'));
    }
    return res.send({ message: 'Contact was deleted successfully' });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`),
    );
  }
};

export const deleteAll = async (req, res, next) => {
  res.send({ message: 'deleteAll handler' });
  try {
    const contactService = new ContactService(mongodb.client);
    const deletedCount = await contactService.deleteAll();
    return res.send({
      message: `${deletedCount} contacts were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, 'An error occurred while removing all contacts'),
    );
  }
};

export const findAllFavorite = async (req, res, next) => {
  try {
    const contactService = new ContactService(mongodb.client);
    const documents = await contactService.findFavorite();
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, 'An error occurred while retrieving favorite contacts'),
    );
  }
};
