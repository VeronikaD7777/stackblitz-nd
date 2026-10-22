/**
 * Импортируется класс Linker из файла sqlite.js
 * Он используется для подключения к SQLite и выполнения SQL-запросов
 */
import Linker from './sqlite.js';

// Функция выполняет переданный SQL-запрос
async function exec(sql) {
  // Проверяем, что sql является строкой и что строка не пустая
  if (typeof sql !== 'string' || sql.trim().length === 0) {
    // Если проверка не пройдена выбрасываем ошибку
    throw new Error('This migration failed the validation!');
  }
  //Объявляем переменную для хранения подключения к базе данных
  let linker;
  try {
    // Создаем 
    linker = new Linker('./database.db');
    await linker.connect();
    return await linker.run(sql);
  } catch (err) {
    console.log(err);
    throw new Error('This migration is failed. Try with another sql.');
  } finally {
    await linker.close();
  }
}

async function up(sql) {
  await exec(sql);
}

async function down(sql) {
  await exec(sql);
}

export { up, down };
