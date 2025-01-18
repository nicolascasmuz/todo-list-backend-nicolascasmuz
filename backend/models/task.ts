import { firestore } from "../../lib/firestore";

const collection = firestore.collection("tasks");

export class Task {
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
      const newAuth = new Task(firstDoc.id);
      newAuth.data = firstDoc.data();
      return newAuth;
    } else {
      null;
    }
  }
}
