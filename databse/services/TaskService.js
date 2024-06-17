import * as SQLite from 'expo-sqlite';

const table = 'tasks';
const connection = async () => {
  const db = await SQLite.openDatabaseAsync('tasks.db');

  await db.execAsync(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id integer primary key not null,
      descricao text not null,
      feito boolean default 0);`
  );
  // await db.execAsync('DROP TABLE tasks') 
  return db;
};

export default class TaskService {
  static async addTask(task) {
    const db = await connection();
    const result = await db.runAsync(`INSERT INTO ${table} (descricao) VALUES (?);`, task)    
    console.log(result)
    return result
  }

  static async updateById(task) {
    const db = await connection();
    await db.runAsync(`UPDATE ${table} SET feito = ? WHERE id = ? ;`, !task.feito, task.id)
  }

  static async findAll() {
    const db = await connection(); 
    return await db.getAllAsync('SELECT * FROM tasks');  
  }

  static async removeTask(id) {
    const db = await connection();
    await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, id)
  }
}
