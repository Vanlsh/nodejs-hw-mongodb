import { loginUser, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const { _id, name, email, createdAt, updatedAt } = await registerUser(
    req.body,
  );

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { _id, name, email, createdAt, updatedAt },
  });
};

export const loginUserController = async (req, res) => {
  await loginUser(req.body);

  // далі ми доповнемо цей контролер
};
