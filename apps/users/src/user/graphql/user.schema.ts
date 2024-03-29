
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLDateTime, GraphQLEmailAddress, GraphQLObjectID, GraphQLLatitude, GraphQLLongitude } from 'graphql-scalars'

export class CreateUserInput {
    username: string;
    email: EmailAddress;
    firstName: string;
    lastName: string;
    middleName?: Nullable<string>;
    picture?: Nullable<string>;
    picks: string[];
    latitude?: Nullable<Latitude>;
    longitude?: Nullable<Longitude>;
    device: string;
}

export class UpdateUserInput {
    id: ObjectID;
    username?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    middleName?: Nullable<string>;
    picks?: Nullable<string[]>;
    picture?: Nullable<string>;
    devices?: Nullable<string[]>;
    latitude?: Nullable<Latitude>;
    longitude?: Nullable<Longitude>;
    pings?: Nullable<string[]>;
}

export interface BaseError {
    message: string;
}

export interface Edge {
    cursor: Cursor;
}

export interface Connection {
    pageInfo: PageInfo;
}

export class Name {
    firstName: string;
    middleName?: Nullable<string>;
    lastName: string;
}

export class User {
    id: ObjectID;
    email: EmailAddress;
    username: string;
    name?: Nullable<Name>;
    picture?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    picks: string[];
    pings?: Nullable<Nullable<Ping>[]>;
    activityCount?: Nullable<number>;
    devices?: Nullable<string[]>;
}

export abstract class IQuery {
    abstract user(): UserPayload | Promise<UserPayload>;

    abstract userById(id: ObjectID): UserPayload | Promise<UserPayload>;

    abstract isUsernameAvailable(username: string): boolean | Promise<boolean>;
}

export class InvalidInputError implements BaseError {
    message: string;
}

export class NotFoundError implements BaseError {
    message: string;
}

export class UnauthorizedError implements BaseError {
    message: string;
}

export class ForbiddenError implements BaseError {
    message: string;
}

export class InternalServerError implements BaseError {
    message: string;
}

export class UnknownError implements BaseError {
    message: string;
}

export class PageInfo {
    hasNextPage: boolean;
    endCursor?: Nullable<Cursor>;
    totalCount?: Nullable<number>;
}

export class Ping {
    id: ObjectID;
    user?: Nullable<User>;
}

export abstract class IMutation {
    abstract createUser(payload: CreateUserInput): UserPayload | Promise<UserPayload>;

    abstract updateUser(payload: UpdateUserInput): UserPayload | Promise<UserPayload>;

    abstract removeUser(id: ObjectID): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = typeof GraphQLDateTime;
export type EmailAddress = typeof GraphQLEmailAddress;
export type ObjectID = typeof GraphQLObjectID;
export type Longitude = typeof GraphQLLongitude;
export type Latitude = typeof GraphQLLatitude;
export type Cursor = unknown;
export type UserPayload = User | NotFoundError | UnknownError | InternalServerError;
type Nullable<T> = T | null;
