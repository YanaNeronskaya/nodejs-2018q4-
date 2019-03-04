const addLastModifiedData = () => {
    return {
        lastModifiedData: new Date(),
        $setOnInsert: {
            createdAt: new Date()
        }
    }
};

module.exports = {
    addLastModifiedData: addLastModifiedData
};
