'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, required: true },
    answers: {type: mongoose.Schema.Types.Mixed, required: true },
    created: { type: Date, default: Date.now }
});