const logger = (req , res , next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log(Date.now());
    next();
}

module.exports=logger;
