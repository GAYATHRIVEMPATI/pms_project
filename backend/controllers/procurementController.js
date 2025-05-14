const Procurement = require('../models/Procurement');

// GET /api/procurements
const getAllProcurements = async (req, res) => {
  try {
    const procurements = await Procurement.find({});
    res.status(200).json(procurements);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch procurements", error });
  }
};

module.exports = {
  getAllProcurements,
};
