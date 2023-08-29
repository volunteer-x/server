/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import {
  GraphQLDateTime,
  GraphQLEmailAddress,
  GraphQLObjectID,
} from 'graphql-scalars';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ACTIVITY_OWNER = 'ACTIVITY_OWNER',
  FORUM_MODERATOR = 'FORUM_MODERATOR',
}

export interface CreateUserInput {
  username: string;
  email: Email;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface UpdateUserInput {
  id: ObjectID;
  usename?: Nullable<string>;
  email?: Nullable<string>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
}

export interface Name {
  firstName: string;
  middleName?: Nullable<string>;
  lastName: string;
}

export interface User {
  id: ObjectID;
  email: string;
  username: string;
  role: Role;
  name?: Nullable<Name>;
  createdAt?: Nullable<DateTime>;
  updatedAt?: Nullable<DateTime>;
}

export interface IQuery {
  users(): Nullable<User>[] | Promise<Nullable<User>[]>;
  getUserByID(id: ObjectID): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
  createUser(createUserInput: CreateUserInput): User | Promise<User>;
  updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
  removeUser(id: ObjectID): Nullable<User> | Promise<Nullable<User>>;
}

export interface ISubscription {
  watchUsernameAvailability(
    username?: Nullable<string>,
  ): boolean | Promise<boolean>;
}

export type DateTime = typeof GraphQLDateTime;
export type Email = typeof GraphQLEmailAddress;
export type ObjectID = typeof GraphQLObjectID;
type Nullable<T> = T | null;
