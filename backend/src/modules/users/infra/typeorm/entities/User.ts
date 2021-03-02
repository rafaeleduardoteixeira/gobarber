import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer'
import uploadConfig from '@config/upload'

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  @Exclude()
  password: string;
  @Column()
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @Column()
  avatar: string;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (uploadConfig.driver == 'disk') {
      return this.avatar ? `${process.env.APP_API_URI}/files/${this.avatar}` : null
    } else {
      return this.avatar ? `${process.env.APP_AMAZON_URI}/${this.avatar}` : null
    }
  }
}

export default User;
