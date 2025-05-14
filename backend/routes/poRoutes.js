const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// PO Schema
const poSchema = new mongoose.Schema({
  poNumber: { type: String, required: true, unique: true },
  itemCount: { type: Number, required: true },
});

// ✅ Safe model registration
const PO = mongoose.models.PO || mongoose.model('PO', poSchema);

// ✅ GET all PO numbers (for dropdown)
router.get('/', async (req, res) => {
  try {
    const pos = await PO.find();
    res.json(pos);
  } catch (err) {
    console.error("Error fetching POs:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ POST route to create a new PO
router.post('/', async (req, res) => {
  const { poNumber, itemCount } = req.body;

  try {
    const existingPO = await PO.findOne({ poNumber });
    if (existingPO) {
      return res.status(400).json({ message: `PO ${poNumber} already exists.` });
    }

    const newPO = new PO({ poNumber, itemCount });
    await newPO.save();

    res.status(201).json({ message: 'PO created', po: newPO });
  } catch (err) {
    console.error("Error creating PO:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ PATCH to decrement itemCount after item entry
router.patch('/:poNumber/decrement', async (req, res) => {
  const { poNumber } = req.params;
  const { decrementBy } = req.body;

  const qty = parseInt(decrementBy, 10);
  if (isNaN(qty) || qty <= 0) {
    return res.status(400).json({ message: 'Invalid quantity to decrement' });
  }

  try {
    const po = await PO.findOne({ poNumber });

    if (!po) {
      return res.status(404).json({ message: `PO ${poNumber} not found` });
    }

    if (po.itemCount < qty) {
      return res.status(400).json({
        message: `Not enough items left in PO. Available: ${po.itemCount}, Requested: ${qty}`,
      });
    }

    po.itemCount -= qty;
    await po.save();

    res.json({ message: 'PO itemCount updated', updatedPO: po });
  } catch (error) {
    console.error("Error updating PO:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ DELETE a PO by poNumber
router.delete('/:poNumber', async (req, res) => {
  try {
    const result = await PO.deleteOne({ poNumber: req.params.poNumber });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'PO not found' });
    }
    res.json({ message: `PO ${req.params.poNumber} deleted successfully` });
  } catch (err) {
    console.error("Error deleting PO:", err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
