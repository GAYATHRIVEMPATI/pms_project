const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const PO = require('../models/PO');

// Get all items
router.get('/', async (req, res) => {
    try {
        const { department } = req.query;
        const filter = department && department !== "All"
            ? { department: { $regex: new RegExp(department, 'i') } }
            : {};

        const items = await Item.find(filter);
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for the given department' });
        }

        const audit = {
            department: department || "All Departments",
            date: new Date().toISOString().split('T')[0],
            status: "Auto-Generated",
            items
        };

        res.status(200).json([audit]);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Failed to fetch items' });
    }
});

// Add new item and update PO count
router.post('/', async (req, res) => {
    try {
        const {
            poNumber,
            itemType,
            itemName,
            itemVariant = '',
            department,
            itemDescription,
            functionalQty,
            damagedQty,
            dateOfReceipt
        } = req.body;

        const requiredFields = [poNumber, itemType, itemName, department, itemDescription, dateOfReceipt];
        for (const field of requiredFields) {
            if (!field) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        const functional = parseInt(functionalQty, 10) || 0;
        const damaged = parseInt(damagedQty, 10) || 0;
        const totalUsed = functional + damaged;

        if (functional < 0 || damaged < 0) {
            return res.status(400).json({ error: 'Invalid functional or damaged quantity' });
        }

        // Decrement PO atomically
        const po = await PO.findOneAndUpdate(
            { poNumber, itemCount: { $gte: totalUsed } },
            { $inc: { itemCount: -totalUsed } },
            { new: true }
        );

        if (!po) {
            return res.status(400).json({ error: 'PO not found or not enough quantity left' });
        }

        const newItem = new Item({
            poNumber,
            itemType,
            itemName,
            itemVariant,
            department,
            itemDescription,
            functionalQty: functional,
            damagedQty: damaged,
            dateOfReceipt
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(400).json({ error: error.message });
    }
});

// Update item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(400).json({ error: error.message });
    }
});

// Delete item
router.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
