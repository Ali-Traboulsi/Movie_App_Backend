const mongoose = require('mongoose');

const verifyActorId = async (actorId) => {
    await mongoose.model('Actor').findById({_id: actorId});
    return true;
};

const verifyUniqueActors = (actors = []) => {
    console.log('actors: ', actors);
    let actorIds = [];
    actorIds.push(actors.toString());
    const uniqueActors = new Set(actorIds);
    console.log(uniqueActors);
    return uniqueActors.size === actorIds.length;
};

module.exports = {
    verifyActorId,
    verifyUniqueActors
};


