import { ApiProperty } from "@nestjs/swagger";
import { Books } from "src/book/book.entity";
import { User } from "src/users/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "borrows" })
export class Borrows {
  @ApiProperty({ nullable: false, uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ nullable: false })
  @Column({ nullable: false })
  userId: number;

  @ApiProperty({ nullable: false })
  @Column({ nullable: false })
  bookId: number;

  @ApiProperty({ nullable: false })
  @Column({ type: "timestamp", nullable: false })
  borrowDateTime: string;

  @ApiProperty({ nullable: true })
  @Column({ type: "timestamp", nullable: true })
  returnDateTime: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  status: string;

  @ApiProperty({ nullable: false })
  @CreateDateColumn()
  createdTimestamp: string;

  @ApiProperty({ nullable: false })
  @UpdateDateColumn()
  updatedTimestamp: string;

  @ApiProperty()
  @ManyToOne(() => User)
  user: User;

  @ApiProperty()
  @ManyToOne(() => Books)
  book: Books;
}
