const models = require('../models');
import config from '../config/initial-config';

console.log(config.appName);

const user1 = new models.User();
const product1 = new models.Product();

user1.initialLogs();
product1.initialLogs();