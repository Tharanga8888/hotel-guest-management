import { pb } from "./pb";
import type { Guest } from "../types";

const collection = "guests";

export const GuestAPI = {
  list: (page = 1, perPage = 20, options = {}) =>
    pb.collection(collection).getList<Guest>(page, perPage, options), //haven't use, use if enable pagination

  listAll: (options = {}) =>
    pb.collection(collection).getFullList<Guest>({
      sort: '-created', ...options,
  }),

  get: (id: string) =>
    pb.collection(collection).getOne<Guest>(id),

  create: (data: Partial<Guest>) =>
    pb.collection(collection).create<Guest>(data),

  update: (id: string, data: Partial<Guest>) =>
    pb.collection(collection).update<Guest>(id, data),

  delete: (id: string) =>
    pb.collection(collection).delete(id),
};
