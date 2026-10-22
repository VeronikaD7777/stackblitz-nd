import { up } from '../migration.js';

async function createDB() {
  await up(`
    PRAGMA foreign_keys = ON;
  `);

  // create Category table
  await up(`
    create table if not exists category (
      id integer primary key autoincrement,
      name text not null,
      parent_id integer,
      foreign key (parent_id) references category(id)
        on delete set null
    );
  `);

  // create Structure table
  await up(`
    create table if not exists structure (
      id integer primary key autoincrement,
      name text not null,
    );
  `);

  // create Floor table
  await up(`
    create table if not exists floor (
      id integer primary key autoincrement,
      name text not null,
      structure_id integer,
      foreign key (structure_id) references structure(id)
        on delete set null
    );
  `);

  // create Room table
  await up(`
    create table if not exists room (
      id integer primary key autoincrement,
      name text not null,
      floor_id integer,
      foreign key (floor_id) references floor(id)
        on delete set null
    );
  `);

  // create Place table
  await up(`
    create table if not exists place (
      id integer primary key autoincrement,
      name text not null,
      room_id integer,
      foreign key (room_id) references room(id)
        on delete set null
    );
  `);

  // create Location table
  await up(`
    create table if not exists location (
      id integer primary key autoincrement,
      name text not null,
      place_id integer,
      foreign key (place_id) references place(id)
        on delete set null 
    );
  `);

  // create Item table
  await up(`
    create table if not exists item (
      id integer primary key autoincrement,
      is_deleted boolean,
      name text not null,
      properties jsonb not null,
      status text not null
      location_id integer not null,
      current_location_id integer not null,
      category_id integer not null,

      foreign key (location_id) references location(id)
      foreign key (current_location_id) references location(id)
      foreign key (category_id) references category(id)
    );
  `);
}
