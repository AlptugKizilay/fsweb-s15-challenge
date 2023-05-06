const db = require("../../data/dbConfig");

const getAllUsers = async function(){
    return await db("users");
    
}
const getByFilter = async function(filter){
    return await db("users").where(filter).first();
}
const insertUser = async function(user){
    const [insertedId] = await db("user").insert(user);
    return await getByFilter({id:insertedId});
}
module.exports = {
    getAllUsers,
    getByFilter,
    insertUser
}
