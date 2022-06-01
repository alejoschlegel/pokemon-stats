// get all data from effectivenes json 
// and return it as an array
const fs = require('fs');
alltypes = [];
getallTypes = async () => {
    let data = fs.readFileSync('./effectivenes.json');
    let types = JSON.parse(data);
    console.log("total types in pokemon: " + Object.keys(types.defence).length);
}
getallTypes();