import userValidation from '../models/user';

const questionerUsers = [
  {
    id: 1,
    firstname: 'Ahmad',
    lastname: 'Lateef',
    othername: 'Olamilekan',
    email: 'lateefahmad3868@gmail.com',
    phoneNumber: '08097012219',
    username: 'Bluebird2000',
    password: 'default111',
    registered: new Date(),
    isAdmin: true,
  },
  {
    id: 2,
    firstname: 'Victoria',
    lastname: 'Olakanmi',
    othername: 'olushola',
    email: 'Olakanmi123@gmail.com',
    phoneNumber: '08029803788',
    username: 'sholi',
    registered: new Date(),
    password: 'default111',
    isAdmin: false,
  },
];
exports.userSignup = (req, res) => {
  const { error } = userValidation(req.body);
  if (error) {
    const err = error.details[0].message;
    res.status(400)
      .send({
        status: 400, error: err,
      });
    return;
  }
  const data = {
    id: questionerUsers.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othername: req.body.othername,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    username: req.body.username,
    password: req.body.password,
    registered: new Date(),
    isAdmin: req.body.isAdmin,
  };
  questionerUsers.push(data);
  res.status(200)
    .send({
      status: 200,
      data: [data],
    });
};

exports.getUsers = (req, res) => {
  const user = questionerUsers.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404)
      .send({
        status: 404,
        error: `User with the given ID: ${req.params.id} does not exist`,
      });
    return;
  }
  res.send({ status: 200, data: [user] }).status(200);
};

exports.updateUser = (req, res) => {
  const user = questionerUsers.find(u => u.id === parseInt(req.params.id));
  const { error } = userValidation(req.body);
  if (!user) {
    return res.status(404)
      .send({
        status: 404,
        error: `User with the given ID: ${req.params.id} does not exist`,
      });
  }
  if (error) {
    const err = error.details[0].message;
    return res.status(400)
      .send({
        status: 400,
        error: err,
      });
  }
  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.othername = req.body.othername;
  user.email = req.body.email;
  user.phoneNumber = req.body.phoneNumber;
  user.username = req.body.username;
  user.password = req.body.password;
  return res.status(200)
    .send({
      status: 200,
      data: [user],
    });
};
