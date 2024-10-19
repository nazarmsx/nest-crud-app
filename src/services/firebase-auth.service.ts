import { Injectable } from '@nestjs/common';

import { FirebaseRepository } from '../firebase-admin/firebase.repository';

@Injectable()
export class FirebaseAuthService {
  constructor(private firebaseRepository: FirebaseRepository) {}

  public listUsers(){
  }
}
