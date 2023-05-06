const { JWT_SECRET } = require("../secrets");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  
  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
try {
  const tokenHeader = req.headers["authorization"];
  if(!tokenHeader){
    res.status(401).json({"message": "token gereklidir"})
  }else{
    jwt.verify(tokenHeader,JWT_SECRET,(err,decodeToken) => {
      if(err){
        res.status(401).json({ "message": "token gecersizdir"})
      }else{
        req.decodeToken = decodeToken;
        next();
      }
    })
  }
} catch (error) {
  next(error);
}

};
