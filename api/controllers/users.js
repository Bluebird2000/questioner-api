import userValidation from '../models/user';

const questionerUsers = [
];
exports.users_sign_up = (req, res) => {
  const { error } = userValidation(req.body);
  if (error) {
    const err = error.details[0].message;
    return res.status(400).send({ status: 'error', error: err });
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
  return res.send({ status: 200, data }).status(200);
};
