const fs = require('fs');
var crypto = require('crypto');
import * as mongoose from 'mongoose';
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || '123';

export const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true
	},
	hash: String,
	salt: String
});

UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
}

UserSchema.methods.generateJwt = function() {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		mail: this.mail,
		exp: Math.floor((expiry.getTime() / 1000))
	}, SECRET_KEY);
}