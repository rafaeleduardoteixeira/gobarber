import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from "typeorm";

@Entity("user_tokens")
class UserToken {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  token: string;
  @Column()
  user_id: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
