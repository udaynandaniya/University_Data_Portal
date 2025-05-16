
// const mongoose = require('mongoose');

// const updateRequestSchema = new mongoose.Schema({
//   userType: { type: String, enum: ['Student', 'Faculty', 'Alumni'], required: true },
//   userId: { type: String, required: true },
//   departmentName: { type: String, required: true },
//   programName: { type: String, required: true },
//   oldName :{type: String},
//   oldProgramName: { type: String, required: true },
//   requestData: { type: Object, required: true },
//   status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
//   isReadByDepart: { type: Boolean, default: true },  // true when student/alumni sends request
//   isReadByStudent: { type: Boolean, default: false }, // false until status becomes "approved"/"rejected"
//    createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('UpdateRequest', updateRequestSchema);

const mongoose = require('mongoose');

const updateRequestSchema = new mongoose.Schema({
  userType: { type: String, enum: ['Student', 'Faculty', 'Alumni'], required: true },
  userId: { type: String, required: true },
  departmentName: { type: String, required: true },
  programName: { type: String, required: true },
  oldName: { type: String },
  oldProgramName: { type: String, required: true },
  requestData: { type: Object, required: true },

  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },

  isReadByDepart: { type: Boolean, default: false },   // For department notifications
  isReadByStudent: { type: Boolean, default: true },   // For student/alumni notifications

  message: { type: String },                           // Department feedback (optional)

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UpdateRequest', updateRequestSchema);
