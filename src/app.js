const path = require("path");

import { User, Product } from '../models';
import DirWatcher from '../dirwatcher';
import Importer from '../importer';
import config from '../config/app.config';

console.log(config.appName);

const user = new User();
const product = new Product();

const dirWatcher = new DirWatcher();
dirWatcher.watch(path.resolve(__dirname, '../data/'), 550);

const importer = new Importer();
importer.init();

user.initialLogs();
product.initialLogs();
