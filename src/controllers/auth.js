exports.register = (req, res, next) => {
  const { username, email, password } = req.body;

  res.status(201).json({
    message: "Register Successfully",
    data: { id: 1, username, email, password },
  });

  next();
};
