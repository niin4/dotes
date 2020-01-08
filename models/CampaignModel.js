const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Id is required'],
  },
  name: {
    type: String,
    required: [true, 'Campaignname is required'],
  },
  created: {
    type: Date,
    required: [true, 'Created date is required'],
  },
  private: {
    type: Boolean,
    default: true,
  },
  creator: {
    type: String,
    required: [true, 'Campaign creator is required'],
  },
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = Campaign;
