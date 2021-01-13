import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";

@Entity("appointments")
class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "provider_id" })
  provider: User;

  @Column("datetime")
  date: Date;
}

export default Appointment;
