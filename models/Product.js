class Product {
    constructor(name){
        this.name = name || 'Product module';
    }

    initialLogs() {
        console.log(this.name)
    }
}

module.exports = Product;