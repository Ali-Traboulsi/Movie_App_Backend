const mongoose = require('mongoose');

const verifyDirectorId = async (directorId) => {
    await mongoose.model('Actor').findById({_id: directorId});
    return true;
};

const verifyUniqueDirectors = (directors) => {
    const uniqueActors = new Set(directors);
    return uniqueActors.size === directors.length;
};


module.exports = {
    verifyDirectorId,
    verifyUniqueDirectors
};
