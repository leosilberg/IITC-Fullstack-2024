// THIS IS A FAKE ASYNC STORAGE SERVICE FOR DEMO PURPOSES
// IT FORCES US TO WORK WITH PROMISES AND ASYNC OPERATIONS

import { utilsService } from "./utils.service.js";

export const storageService = {
  get,
  getById,
  post,
  postMany,
  put,
  remove,
};

async function get(entityType) {
  const delay = 200;
  const entities = JSON.parse(localStorage.getItem(entityType)) || [];
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

async function getById(entityType, entityId) {
  const entities = await get(entityType);
  const entity = entities.find((entity) => entity._id === entityId);

  if (!entity) {
    throw new Error(
      `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
    );
  }

  return entity;
}

async function post(entityType, newEntity) {
  const clonedEntity = structuredClone(newEntity);
  clonedEntity._id = utilsService.makeId();
  clonedEntity.createdAt = Date.now();

  const entities = await get(entityType);
  entities.push(clonedEntity);
  utilsService.saveToLocalStorage(entityType, entities);

  return clonedEntity;
}

async function postMany(entityType, newEntities) {
  const clonedEntities = structuredClone(newEntities);
  const entities = await get(entityType);

  clonedEntities.forEach((entity) => {
    entity._id = utilsService.makeId();
    entity.createdAt = Date.now();
    entities.push(entity);
  });

  utilsService.saveToLocalStorage(entityType, entities);
  return clonedEntities;
}

async function put(entityType, updatedEntity) {
  const clonedEntity = structuredClone(updatedEntity);
  const entities = await get(entityType);

  const idx = entities.findIndex((entity) => entity._id === clonedEntity._id);
  if (idx < 0) {
    throw new Error(
      `Update failed, cannot find entity with id: ${clonedEntity._id} in: ${entityType}`
    );
  }

  clonedEntity.updatedAt = Date.now();
  entities.splice(idx, 1, clonedEntity);

  utilsService.saveToLocalStorage(entityType, entities);
  return clonedEntity;
}

async function remove(entityType, entityId) {
  const entities = await get(entityType);
  const idx = entities.findIndex((entity) => entity._id === entityId);

  if (idx < 0) {
    throw new Error(
      `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
    );
  }

  entities.splice(idx, 1);
  utilsService.saveToLocalStorage(entityType, entities);
}