var db = new Dexie("sabzlearn");
const dbVersion = 1;

db.version(dbVersion).stores({
  courses: "id",
});
