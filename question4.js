function errorPage(req,res){
    try{
        let {website} = req.params;
        res.status(404).send(`Page Not Found ${website}`);
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error");
    }
}
export default errorPage;
