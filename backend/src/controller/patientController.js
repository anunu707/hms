const db = require("../config/db.js");
const getAllpatient = async (req,res)=>{
    try{
        let sql="SELECT * FROM patient";
        const[rows]=await db.query(sql);
        res.json(rows);

    }
    catch(error){
        console.error("error fetching patients",error);
        res.status(500).json({error:'internal server error'})
    }
};
module.exports = { getAllpatient };