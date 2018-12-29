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
    isAdmin: false,
  },
];
exports.users_sign_up = (req, res) => {
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
      data,
    });
};

exports.users_get_user = (req, res) => {
  const user = questionerUsers.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    res.status(404)
      .send({
        status: 404,
        error: `User with the given ID: ${req.params.id} does not exist`,
      });
    return;
  }
  res.send(user).status(200);
};
