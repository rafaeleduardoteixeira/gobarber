import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokens from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokens: FakeUserTokens;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokens = new FakeUserTokens();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokens, fakeHashProvider);

  })

  it('Should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    const userToken = await fakeUserTokens.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')
    await resetPasswordService.execute({ token: userToken.token, password: '123' })
    const newUser = await fakeUsersRepository.findById(user.id)

    expect(newUser?.password).toBe('123')
    expect(generateHash).toHaveBeenCalledWith('123')

  })

  it('Should be able to reset withount token', async () => {

    await expect(resetPasswordService.execute({ token: 'notoken', password: '123' })).rejects.toBeInstanceOf(AppError)

  });

  it('Should be able to reset withount user', async () => {

    const { token } = await fakeUserTokens.generate(999);
    await expect(resetPasswordService.execute({ token: token, password: '123' })).rejects.toBeInstanceOf(AppError)

  })

  it('Should be able to reset password if passed 2 hours', async () => {

    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    const userToken = await fakeUserTokens.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(resetPasswordService.execute({ token: userToken.token, password: '123' })).rejects.toBeInstanceOf(AppError)


  })

})