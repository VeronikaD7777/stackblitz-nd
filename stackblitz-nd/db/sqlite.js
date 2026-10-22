import sqlite from 'sqlite3';
import { isEmpty } from '../utils';

export default class SqliteLinker {
  constructor(filename) {
    this.filename = filename;
    this.db = null;
  }

  //Подключается к базе данных
  async connect() {
    this.db = new sqlite.Database(this.filename, function (err) {
      if (err) {
        console.log(JSON.stringify(err));
        return;
      }
      console.log(`Database is started... on the ${this.filename}`);
    });

    return this.db;
  }

  /**
   * Метод run выполняет SQL-запрос, которые не возвращает строк с данными
   * Обычно используется для команд INSERT, UPDATE, DELETE или CREATE TABLE
   * Принимает два аргумента: sql (строка запроса) и params (массив значений для подстановки)
   * Параметры передаются отдельно, чтобы защититься от SQL-инъекций
   * Возвращает Promise, который резолвится с контектством выполнения (this)
   * В this содержатся свойства lastID (ID последней вставленной записи) и changes (кол-во измененных строк)
   */
  async run(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve({
          lastId: this.lastID,
          changes: this.changes,
        });
      });
    });

    return result;
  }

  /**
   * Метод get выполняет SELECT-запрос и возвращает только одну строку
   * Если запрос найдет несколько совпадений, вернется только первая из них
   * Если совпадений нет, вернется underfined
   * Принимает sql (текст запроса) и params (массив параметров)
   * Возвращает Promise, который резолвится объектом с данными строки
   * Идеально подходит для поиска пользователя с ID или email
   */
  async get(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.get(sql, params, function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve(row);
      });
    });

    return result;
  }

  /**
   * Метод all выполняет SELECT-запрос и возвращает массив всех найденых строк
   * В отличии от get, который возвращает только первую строку, all собирает все результаты
   * Если ничего не найдено, возвращает пустой массив []
   * Принимает sql (текст запроса) и params (массив значений для подстановки)
   * Удобно использовать для полусчения списка товаров, пользователей и т.д.
   */
  async all(sql, params = []) {
    const result = await new Promise(function (resolve, reject) {
      this.db.all(sql, params, function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve(rows);
      });
    });

    return result;
  }

  //Разрывает соединение с базой данных
  async close() {
    return new Promise(function (resolve, reject) {
      this.db.close(function (err) {
        if (err) {
          console.log(err);
          reject(err);
          return;
        }

        resolve();
      });
    });
  }

  createPlaceHolders(arr) {
    return arr.map(() => '?').join(', ');
  }

  createSetBlock(properties) {
    const values = [];

    const block = Object.entries(properties)
      .map(([key, value]) => {
        if (isEmpty(value)) return null;

        values.push(values);
        return `${key} = ?`;
      })
      .filter((p) => p !== null)
      .join(', ');

    return { block, values };
  }
}
