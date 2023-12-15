const {
  getData,
  createOrUpdateData,
  findById,
  findByEmail,
} = require("./services");

module.exports = {
  async getUserById(req, res) {
    const { id } = req.params;
    const usersData = getData("users.json");
    try {
      const user = findById(id, usersData);
      if (!user) throw new Error("ID inexistente");
      return res.status(200).send({ message: user });
    } catch (error) {
      return res.status(400).send({ message: error.message });
    }
  },
  async createUser(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .send({ message: "Não deve existir campos em branco" });
    try {
      if (name) {
        if (!name.match(/^[a-zA-Záãç ,.'-]+$/i))
          throw new Error("Nome deve conter apenas letras");
      }
      if (email) {
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
          throw new Error("Formato de email invalido");
      }
      const usersData = getData("users.json");
      const lastId = usersData[usersData.length - 1].id;
      const user = {
        id: lastId + 1,
        name: name,
        email: email,
        password: password,
      };
      usersData.push(user);
      createOrUpdateData("users.json", usersData);
      res.status(200).send({ message: usersData[usersData.length - 1] });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ message: "Não deve existir campos em branco" });
      const user = findByEmail(email);
      if (!user || user.password !== password)
        return res.status(404).send("Credenciais inválidas");
      res.status(200).send(user);
    } catch (error) {}
  },
  async testingEnvironment(req, res) {
    return res.status(200).send(process.env.SECRET);
  },
};
