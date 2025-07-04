export const A = (req, res, next) => {
  console.log("I Am Middleware sample 1");
  console.log(req.url);
  console.log(req.method);
  next();
};

export const B = (req, res, next) => {
  console.log("I Am Middleware sample 1");
  console.log(req.url);
  console.log(req.method);
  next();
};

export const C = (req, res, next) => {
  console.log("I Am Middleware sample 1");
  console.log(req.url);
  console.log(req.method);
  next();
};
