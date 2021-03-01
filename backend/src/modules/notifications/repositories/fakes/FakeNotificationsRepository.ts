import { ObjectID } from 'mongodb'
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

class FakeNotificationsRepository implements INotificationsRepository {
  private notificarions: Notification[] = [];

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { id: new ObjectID(), content, recipient_id })
    this.notificarions.push(notification);

    return notification
  }
}

export default FakeNotificationsRepository;
