// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () => {
  openDB("contacts", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contacts")) {
        console.log("contacts database already exits");
        return;
      }

      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      console.log("contacts database created");
    },
  });
};

export const postDb = async (name, home, cell, email) => {
  console.log("post to base");
  const contactsDB = await openDB("contacts", 1);
  const tx = contactsDB.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.add({ name: name, home_phone: home, cell_phone: cell, email: email });
  const result = await request;
  console.log("Data saved to DB", result);
};

export const getDb = async () => {
  const contactsDB = await openDB("contacts", 1);
  const tx = contactsDB.transaction("contacts", "readonly");
  const store = tx.objectStore("contacts");
  const request = store.getAll();
  const result = await request;
  console.log("data = ", result);
  return result;
};

export const deleteDb = async (id) => {
  const contactsDB = await openDB("contacts", 1);
  const tx = contactsDB.transaction("contacts", "readwrite");
  const store = tx.objectStore("contacts");
  const request = store.delete(id);
  const result = await request;
  console.log("data = ", result);
  return result;
};

initdb();
