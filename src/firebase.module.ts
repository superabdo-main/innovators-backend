import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

// Service account credentials from service_account.json
const serviceAccount = {
  "type": "service_account",
  "project_id": "orent-pay",
  "private_key_id": "7a7219dbeaf5322bcbe6c0f06d7fe834495a76b3",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDZMFs+A6oexG3H\nS/LawqzV4s5f+sBUAQO0NqOTAjvkZ+XS6wKbVPn7ZXVVMgD2pWWlzvQaKI3wvIGO\n+A02YDY7QHrOpOW7uKpu5Ibvl+Fmzk4LXvgeoLmhcM6kItbT913vgbN8xGCymVxi\nNSQr24kw1uqx0FB475NoJ+1gazcfi7I4CcvxtA/5Z2B2LOEnOfqMWsnk2LmCvrlY\nhK3hiyZZ9wfWMBSPGmGDAaqW1V508jrg65jLTWYLMS1E2c0csvRmK8HPz2njN+tm\ngQYwlCbbLPZbGJSu9MEOi6YMDXFdV8vd8vuzbzREl9E/6UJzpHVBHLUp9ZB96lGM\n17B9B+yVAgMBAAECggEARy2H2Y0N5cNuTtBfKL6AMiCAjgf5nA4xDpCRjw4+Xp6G\nPVdzpUB2JKOdjmwy0KJn660lZqU/z1OYCijU+6sQWt7I4Iw+FgVxJaKTblYSMsUN\n4sAfBLqb24LC1hvs187L5EBXeF5LanzEQBM2ZYEvNuhYRioFFX0+i/X5342DpTxi\ndEX7OX6zt3EG9xiAytnAZsSfAJnfEm+2Efnk+i57+fYReb7Zbv5aOZgNmVyamW6+\nhsHJoApnPYOgqJhVv9zPBN8ZN6kllV5D0+BK7j6wg2zy847wII99QJehKYX1msvi\nbYqtSKf1Q47t5he4jPujsdGn5FU2h3p2Sytdaws4CQKBgQDmKQoMA6oSjQbnZ6eX\nbe3EKFi/atnlIDY4tkALA32nxJelayzw8CEyl3Rdhj72fhmGc/hK+nTjKSJFRYRS\nmZ/XXIBdp6wNc5J885e7GNfoEJJ6G51OTGjgdx9YgT0NG/absakWYhHjv5qwV0Fm\nQfteFGf75Cn+b6Z4okoxj6aQuwKBgQDxkoKOhOmsrmBZTXXRd5GjfhlJOnSwuBRn\nWFiHpKHvGF0gY1Ua6/9j/CPfp1zWQ4rTTVxg+9+lwnAwP6+DCzV0N+ob3rAWfP9b\n+PPwgCbde18HK/usCaJJn02UBLvadfMEPurFW8p4pSsSTrxsyfw7CLGm6tCdLhPQ\n1uPhBGaK7wKBgQDHOGio45cXvZhnPpKTAaUX8HB5J6z5pfso9Z/TqK7gQ8ubdHyP\nBNtHZk9kEKp5Q8cmWUVm6Qm6AsXWPgj+UllH2ZqG9nZ3ojz/CP6iBSwFhCq1pSdx\nObRh7tpkCmHk8fpw48PfSv3/K79iufQy5hQFaBZlsyYiRVRMAPXFlnjvtwKBgQDF\nUzTb78vkpwfCypgrwyyuzMkg3OQGmkboZ+zg1+UCpfckBp+0/wM9i+9NuKsHxmI2\n2eFUw0lbYCk98DeQpm5CgY30uAFETVRVr1SrpjKZBjaIaDAKxk/PLZY0C23bNC+O\nz0n8bk9EHz7AlJorjw4+topO204Opl2/YFkCLBMK9wKBgQCF2GAkaEuZUra2VQ/Q\nDuNpbdCWaHmhP0ZkqiNnXp1j6be4hzFQ7UqjlUCBTRQ7mSinpLPOv9HObOZk61va\ns4izEtMvq+QkOE0CFBU1v3e7uVmZ+FNU+BdCvlzQCH22zilIUSU6rocGpMAh/Gda\nfIy3j1gEPOeNmicSdclsxlab2Q==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-5mvb6@orent-pay.iam.gserviceaccount.com",
  "client_id": "108356080363129716284",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5mvb6%40orent-pay.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [],
  useFactory: () => {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  },
};

@Module({
  imports: [],
  providers: [firebaseProvider],
  exports: [firebaseProvider],
})
export class FirebaseModule {}
