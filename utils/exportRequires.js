const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dns = require('dns');

module.exports = {
    express,
    mongoose,
    cors,
    cookieParser,
    config,
    bycrypt,
    jwt,
    dns
};