import { Router } from "express";
import CreateUserService from "../service/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "../config/upload";
import UpdateUserAvatarService from '../service/UpdateUserAvatarService'

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
  });

  const userWithoutPassword = {
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    avatar: user.avatar,
    updated_at: user.updated_at,
  };

  return response.json(userWithoutPassword);
});

usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"), async (request, response) => {
  try {


    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename
    })

    const userWithoutPassword = {
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      avatar: user.avatar,
      updated_at: user.updated_at,
    };

    return response.json(userWithoutPassword);


  } catch (err) {

  }
});

export default usersRouter;
