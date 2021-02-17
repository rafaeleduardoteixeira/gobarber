import ISendMailDTO from "@shared/container/providers/MailProvider/dtos/ISendMailDTO"
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {

    this.messages.push(message)

  }

}