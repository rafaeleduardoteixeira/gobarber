import AppError from '@shared/errors/AppError'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokens from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokens: FakeUserTokens;
let fakeMailProvider: FakeMailProvider;
let sendForgotPassword: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokens = new FakeUserTokens();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPassword = new SendForgotPasswordEmailService(fakeUsersRepository, fakeUserTokens, fakeMailProvider);

  })

  it('Should be able to recover the password', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    await sendForgotPassword.execute({ email: 'rafaeleduardoteixeira@gmail.com' })

    expect(sendMail).toHaveBeenCalled();

  })


  it('Should be able to recover the password non-existing user', async () => {

    await expect(sendForgotPassword.execute({ email: 'rafaeleduardoteixeira@gmail.com' })).rejects.toBeInstanceOf(AppError)

  })

  it('Should generate a forgot password token', async () => {

    const generateToken = jest.spyOn(fakeUserTokens, 'generate');
    const user = await fakeUsersRepository.create({ name: 'Rafael Teixeira', email: 'rafaeleduardoteixeira@gmail.com', password: 'admin' })
    await sendForgotPassword.execute({ email: 'rafaeleduardoteixeira@gmail.com' })

    expect(generateToken).toHaveBeenCalledWith(user.id)

  })

})