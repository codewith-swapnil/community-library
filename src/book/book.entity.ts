import { ApiProperty } from "@nestjs/swagger";

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "books",
  orderBy: { id: { order: "DESC", nulls: "NULLS LAST" } },
})
export class Books {
  @ApiProperty({ nullable: false, uniqueItems: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ nullable: false })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  author: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  ISBN: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  publicationYear: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  genre: string;

  @ApiProperty({ nullable: false })
  @Column({ nullable: false })
  quantityAvailable: number;

  @ApiProperty({ nullable: false, default: false })
  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @ApiProperty({ nullable: false })
  @CreateDateColumn()
  createdTimestamp: string;

  @ApiProperty({ nullable: false })
  @UpdateDateColumn()
  updatedTimestamp: string;
}
