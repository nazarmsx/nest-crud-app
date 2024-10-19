import { Inject, Injectable } from '@nestjs/common';
import { app, auth } from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth';


@Injectable()
export class FirebaseRepository {
  #auth: auth.Auth;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.#auth = firebaseApp.auth();
  }

  async getUsers(): Promise<UserRecord[]>{
    try {
      const users = await this.#auth.listUsers(10);
      return users.users;
    } catch (e) {
      throw  e;
    }
  }
}
