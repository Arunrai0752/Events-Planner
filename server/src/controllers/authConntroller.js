export const register = (req, res) => {
  res.json({ message: "User Register Success" });
};


export const login = (req, res) => {
  res.json({ message: "User Loged In Success" });
};



export const logout = (req, res) => {
  res.json({ message: "User Loged Out Success" });
};
