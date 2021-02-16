import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "@modules/users/infra/typeorm/entities/User";

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  provider_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;

  @Column("datetime")
  date: Date;
}

export default Appointment;
