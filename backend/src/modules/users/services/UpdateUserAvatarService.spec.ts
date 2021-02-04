import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

describe('UpdateUserAvatar', () => {

    it('Should be able to update avatar', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
        await updateUserAvatar.execute({ id: user.id, avatarFileName: 'avatar.jpg' })

        expect(user.avatar).toBe('avatar.jpg');
    })

    it('Should not be able update avatar non exist user', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        expect(updateUserAvatar.execute({ id: 999, avatarFileName: 'avatar.jpg' }),).rejects.toBeInstanceOf(AppError);
    })

    it('Should be able to delete avatar', async () => {

        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();
        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
        await updateUserAvatar.execute({ id: user.id, avatarFileName: 'avatar.jpg' })
        await updateUserAvatar.execute({ id: user.id, avatarFileName: 'avatar2.jpg' })

        expect(user.avatar).toBe('avatar2.jpg');
    })

})