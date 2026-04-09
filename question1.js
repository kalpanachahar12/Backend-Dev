import fs from 'fs';
function filtering(req,res){
    try{
        let {id} = req.params;
        id = Number(id.slice(1));

        if(!id){
            return res.status(400).send("Name is Invalid");
        }
        id = Number(id);
        if(!fs.existsSync("user.json")){
            return res.status(404).send("No user Found");
        }
        const data = fs.readFileSync("user.json","utf-8");
        const parsedData = JSON.parse(data);
        const isUser = parsedData.filter(a => a.id == id);
        if(!isUser){
            return res.status(404).send("No user Found");
        }
        const details = JSON.stringify(isUser);
        return res.status(201).send(details);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
}
export default filtering;