import { EItemStatus } from '../db/enums.js';
import { isCorrectStatus, isNotEmpty } from '../utils.js';
import ItemService from './item-service.js';

export default class ItemController {
  constructor() {
    this.service = new ItemService();
  }

  async getItem(ctx) {
    const { id } = ctx.params;

    const res = await this.service.getOne(id);

    ctx.status = 200;
    ctx.body = {
      data: res,
    };
  }

  async getItems(ctx) {
    const { ids } = ctx.query;

    const res = await this.service.getAll({ ids });

    ctx.status = 200;
    ctx.body = {
      data: res,
    };
  }

  async deleteItem(ctx) {
    const { id } = ctx.params;

    await this.service.softDelete(id);

    ctx.status = 201;
    ctx.body = {
      status: 200,
      message: 'OK',
    };
  }

  async updateItem(ctx) {
    const { id } = ctx.params;
    const {
      name,
      properties,
      status,
      location_id,
      current_location_id,
      category_id,
    } = ctx.request.body;

    if (
      !this.#hasCorrectItemData({
        name,
        properties,
        status,
        location_id,
        current_location_id,
        category_id,
      })
    ) {
      return this.#throwUncorrectedDataError(ctx);
    }

    const res = this.service.update(id, {
      name,
      properties,
      status,
      location_id,
      current_location_id,
      category_id,
    });

    ctx.status = 201;
    ctx.body = {
      data: res,
    };
  }

  async createItem(ctx) {
    const {
      name,
      properties,
      status,
      location_id,
      current_location_id,
      category_id,
    } = ctx.request.body;

    if (
      !this.#hasCorrectItemData({
        name,
        properties,
        status,
        location_id,
        current_location_id,
        category_id,
      })
    ) {
      return this.#throwUncorrectedDataError(ctx);
    }

    const res = this.service.create({
      name,
      properties,
      status,
      location_id,
      current_location_id,
      category_id,
    });

    ctx.status = 201;
    ctx.body = {
      data: res,
    };
  }

  #hasCorrectItemData({
    name,
    properties,
    status,
    location_id,
    current_location_id,
    category_id,
  }) {
    isNotEmpty(name) ||
      isNotEmpty(properties) ||
      isNotEmpty(status) ||
      isCorrectStatus(EItemStatus, status) ||
      isNotEmpty(location_id) ||
      isNotEmpty(current_location_id) ||
      isNotEmpty(category_id);
  }

  #throwUncorrectedDataError(ctx) {
    ctx.status = 400;
    ctx.body = {
      status: 400,
      message: 'Переданы неверные клиентские данные',
    };
  }
}
