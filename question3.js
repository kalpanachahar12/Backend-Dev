import fs from 'fs';

function message(req,res){
    try{
        const {name,email,message} = req.body;
        if(!name || !email || !message){
            return res.status(400).send("All Fields are required");
        }
        let contact = [];
        if(fs.existsSync("contact.json")){
            const data = fs.readFileSync("contact.json","utf-8");
            const contact = JSON.parse(data);
            const isMessage  = contact.find(a => a.email === email);
            if(isMessage){
                return res.status(409).send("request Already Exist")
            }
        }
        const ob = {
            id: Date.now(),
            name,
            email,
            message
        };
        contact.push(ob);
        
        fs.writeFileSync("contact.json",JSON.stringify(contact,null,2));
         res.status(201).send("Form Submitted");
    } catch(error){
        console.log(error);
        return res.status(500).send("Server Error");
    }
}
export default message;