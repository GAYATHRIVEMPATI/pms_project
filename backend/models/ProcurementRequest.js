const mongoose = require('mongoose');

// Schema for comments on the request, including approval/rejection actions
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // Reference User model for the author
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // Fields for approval/rejection actions
  action: { type: String, enum: ['approved', 'rejected', 'comment'], default: 'comment' },
  level: { type: String, enum: ['departmentAdmin', 'procurementAdmin', 'dean', null], default: null }
});

// Main Request Schema with Multi-Level Approval
const procurementRequestSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: { type: String, required: true },
  quantity: { type: Number, required: true },
  singleItemCost: { type: Number, required: true },
  estimatedCost: { type: Number, required: true },
  department: { type: String, required: true },
  justification: { type: String, required: true },
  attachments: [{
    filename: String,
    path: String,
    mimetype: String,
    size: Number
  }],
  status: { type: String, default: 'pending' }, // Default status
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submissionDate: { type: Date, default: Date.now },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  departmentAdminApproved: { type: Boolean, default: false },
  procurementAdminApproved: { type: Boolean, default: false },
  deanAdminApproved: { type: Boolean, default: false },
  approvalStatus: {
    departmentAdmin: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      approverName: { type: String },
      timestamp: { type: Date },
      comments: { type: String, trim: true }
    },
    procurementAdmin: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      approverName: { type: String },
      timestamp: { type: Date },
      comments: { type: String, trim: true }
    },
    dean: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      },
      approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      approverName: { type: String },
      timestamp: { type: Date },
      comments: { type: String, trim: true }
    }
  },
  overallStatus: {
    type: String,
    enum: ['pending_dept_approval', 'pending_procurement_approval', 'pending_dean_approval', 'fully_approved', 'rejected'],
    default: 'pending_dept_approval',
    required: true
  },
  rejectionReason: { type: String, trim: true },
  rejectedByLevel: { type: String, enum: ['departmentAdmin', 'procurementAdmin', 'dean', null] }
}, {
  timestamps: true
});

// Add a pre-save hook to update the overallStatus based on approval statuses
procurementRequestSchema.pre('save', function(next) {
  // If any level has rejected, the overall status is rejected
  if (this.approvalStatus.departmentAdmin.status === 'rejected' ||
      this.approvalStatus.procurementAdmin.status === 'rejected' ||
      this.approvalStatus.dean.status === 'rejected') {
    this.overallStatus = 'rejected';
    return next();
  }

  // If all levels have approved, the overall status is fully approved
  if (this.approvalStatus.departmentAdmin.status === 'approved' &&
      this.approvalStatus.procurementAdmin.status === 'approved' &&
      this.approvalStatus.dean.status === 'approved') {
    this.overallStatus = 'fully_approved';
    return next();
  }

  // Otherwise, determine which level is pending
  if (this.approvalStatus.departmentAdmin.status === 'pending') {
    this.overallStatus = 'pending_dept_approval';
  } else if (this.approvalStatus.procurementAdmin.status === 'pending') {
    this.overallStatus = 'pending_procurement_approval';
  } else if (this.approvalStatus.dean.status === 'pending') {
    this.overallStatus = 'pending_dean_approval';
  }

  next();
});

module.exports = mongoose.model('ProcurementRequest', procurementRequestSchema);
