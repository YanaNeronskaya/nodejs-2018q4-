class User {
    constructor(name){
        this.name = name || 'User module';
    }

    initialLogs() {
        console.log(this.name)
    }
}

module.exports = User;