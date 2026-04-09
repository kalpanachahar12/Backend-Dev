import fs from 'fs';
function resTime(req,res,next){
    const start = Date.now(); 

    res.on("finish", () => {
        const end = Date.now(); 
        const duration = end - start;

        fs.writeFileSync("logReport.txt",` response time${req.method}  - ${duration}ms`);
    });

    next();
};
export default resTime;