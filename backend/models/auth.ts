import { firestore } from "../../lib/firestore";

const collection = firestore.collection("auths");

class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  constructor(id) {
    this.ref = collection.doc(id);
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async findByEmail(email: string) {
    const result = await collection.where("email", "==", email).get();

    if (result.docs.length) {
      const firstDoc = result.docs[0];
      const newAuth = new Auth(firstDoc.id);
      newAuth.data = firstDoc.data();
      return newAuth;
    } else {
      null;
    }
  }
  static async createAuth(body) {
    const newDoc = await collection.add(body);
    const docData = await newDoc.get();
    const authData = docData.data();
    return authData;
  }
}

export { Auth };
