import { firestore } from "../../lib/firestore";

const collection = firestore.collection("tasks");

class Task {
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
  static async createTask(body) {
    const result = await collection.where("email", "==", body.email).get();

    if (!result.docs.length) {
      const newDoc = await collection.add(body);
      const docData = await newDoc.get();
      return docData.data();
    } else {
      return null;
    }
  }
  static async pushTask(body) {
    const result = await collection.where("email", "==", body.email).get();

    const firstDoc = result.docs[0];
    const docData = firstDoc.data();
    const docRef = firstDoc.ref;

    let tasks: Array<object> = docData.tasks;
    tasks.push(body.tasks[0]);

    const data = {
      email: docData.email,
      tasks,
    };

    await docRef.update(data);
    const updatedData = await docRef.get();
    return updatedData.data();
  }
  static async getTasks(email) {
    const result = await collection.where("email", "==", email).get();

    const firstDoc = result.docs[0];
    const docData = firstDoc.data();

    return docData.tasks;
  }
}

export { Task };
