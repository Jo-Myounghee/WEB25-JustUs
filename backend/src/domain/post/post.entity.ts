import { Album } from "src/domain/album/album.entity";
import { TimeStampEntity } from "src/custom/myBaseEntity/timestampEntity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Image } from "src/domain/image/image.entity";
import { User } from "src/domain/user/user.entity";
import { HashTag } from "src/domain/hashtag/hashtag.entity";

@Entity({ name: "posts" })
export class Post extends TimeStampEntity {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column()
  postTitle: string;

  @Column({ type: "text" })
  postContent: string;

  @Column()
  postDate: Date;

  @Column()
  postLocation: string;

  @Column({ type: "decimal", precision: 18, scale: 10 })
  postLatitude: number;

  @Column({ type: "decimal", precision: 18, scale: 10 })
  postLongitude: number;

  @ManyToOne(() => Album, album => album.posts)
  @JoinColumn({ name: "album_id" })
  album: Album;

  @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => Image, image => image.post, { cascade: true })
  images: Image[];

  @ManyToMany(() => HashTag, { cascade: ["insert", "update"] })
  @JoinTable({ name: "posts_hashtags" })
  hashtags: HashTag[];
}
