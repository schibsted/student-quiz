'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    answers: mongoose.Schema.Types.Mixed,
    created: { type: Date, default: Date.now }
});