import { Injectable } from '@nestjs/common';
import usersRepository from 'repositories/users';
import { CreateUserData } from './dto/user.create';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ObjectLiteral } from 'typeorm';

@Injectable()
export class UserService {
  create(user: CreateUserData): Promise<ObjectLiteral[] | Error> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10).then((hashedStr) => {
        usersRepository
          .insert({
            id: crypto.randomUUID(),
            email: user.email,
            password: hashedStr,
            subscribeNews: user.subscribe_news,
            displayName: user.display_name,
            username: user.username,
          })
          .then((res) => resolve(res.identifiers))
          .catch((err) => reject(err));
      });
    });
  }
}
