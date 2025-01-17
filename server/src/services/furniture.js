//TODO replace with real data service according exam description

const { Furniture } = require('../models/Furniture');

async function getAll(){
    return Furniture.find().lean();
}

async function getByAuthorId(id){
    return Furniture.find({ owner: id}).lean();
}

async function getById(id){
    return Furniture.findById(id).lean();
}

async function create(data, authorId){
    //TODO extract properties from view model

    const record = new Furniture({
        make: data.make,
        model: data.model,
        year: data.year,
        description: data.description,
        price: data.price,
        img: data.img,
        material: data.material,
        owner: authorId
    });

    await record.save();

    return record;
}

async function update(id, data, userId){
    const record = await Furniture.findById(id);

    if(!record){
        throw new ReferenceError('Record not found ' + id);
    }

    if(record.owner.toString() != userId){
        throw new Error('Access denied');
    }

   

    
        record.make = data.make;
        record.model  = data.model;
        record.year = data.year;
        record.description = data.description;
        record.price = data.price;
        record.img = data.img;
        record.material = data.material;

    await record.save();

    return record;
}

async function deleteById(id, userId){
    const record = await Furniture.findById(id);

    if(!record){
        throw new ReferenceError('Record not found ' + id);
    }

    if(record.owner.toString() != userId){
        throw new Error('Access denied');
    }

    await Furniture.findByIdAndDelete(id);
}

module.exports = {
    getAll,
    getByAuthorId,
    getById,
    create,
    update,
    deleteById
}