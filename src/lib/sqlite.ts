import  Database from "better-sqlite3";

const db = new Database("data/db_RM.db",{
    // readonly: true,
    fileMustExist: true,
});

export default db;


