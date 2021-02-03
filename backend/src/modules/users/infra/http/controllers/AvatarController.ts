import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class AvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const user = await updateUserAvatar.execute({
            id: request.user.id,
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
    }
}