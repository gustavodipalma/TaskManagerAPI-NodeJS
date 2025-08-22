import * as admin from 'firebase-admin';
import * as path from 'path';

// Construindo o caminho para o arquivo de chave de serviço a partir da raiz do projeto
const serviceAccountPath = path.resolve(__dirname, '..', '..', 'firebase-service-account-key.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export { db };
