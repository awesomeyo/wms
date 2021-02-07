const db = require("../models");
const paging = require('../utils/pagination')
const Warehouse = db.warehouses;
const Op = db.Sequelize.Op;

// Create and Save a new Warehouse
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Warehouse
  const warehouse = {
    name: req.body.name,
    area: req.body.area,
  };

  // Save Warehouse in the database
  Warehouse.create(warehouse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Warehouse."
      });
    });
};

exports.findAll = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = paging.getPagination(page, size);

  Warehouse.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = paging.getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving warehouses."
      });
    });
};

// Find a single Warehouse with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Warehouse.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Warehouse with id=" + id
      });
    });
};

// Update a Warehouse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Warehouse.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Warehouse was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Warehouse with id=${id}. Maybe Warehouse was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Warehouse with id=" + id
      });
    });
};

// Delete a Warehouse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Warehouse.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Warehouse was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Warehouse with id=${id}. Maybe Warehouse was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Warehouse with id=" + id
      });
    });
};

// Delete all Warehouses from the database.
exports.deleteAll = (req, res) => {
  Warehouse.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Warehouses were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all warehouses."
      });
    });
};
