import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @ApiProperty({ nullable: false, uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ nullable: false, uniqueItems: true })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ nullable: true, uniqueItems: true })
  @Column({ nullable: true, unique: true })
  userName: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  fullName: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  password: string;

  @ApiProperty({ nullable: false, default: true })
  @Column({ nullable: false, default: true })
  isActive: boolean;

  @ApiProperty({ nullable: false, default: false })
  @Column({ nullable: false, default: false })
  isAdmin: boolean;

  @ApiProperty({ nullable: false })
  @CreateDateColumn()
  createdTimestamp: string;

  @ApiProperty({ nullable: true })
  @UpdateDateColumn()
  updatedTimestamp: string;
}
