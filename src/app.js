import { User, Product } from '../models';
import config from '../config/app.config';

console.log(config.appName);

const user = new User();
const product = new Product();

user.initialLogs();
product.initialLogs();