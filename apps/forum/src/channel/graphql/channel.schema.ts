
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLObjectID, GraphQLPositiveInt } from 'graphql-scalars'

export interface BaseError {
    message: string;
}

export interface Edge {
    cursor: string;
}

export interface Connection {
    pageInfo: PageInfo;
}

export class Channel {
    id: ObjectID;
    activityId: ObjectID;
    ping: Ping;
    title: string;
    admin: User;
    participants: User[];
}

export class ChannelEdge implements Edge {
    cursor: string;
    node: Channel;
}

export class ChannelConnection implements Connection {
    pageInfo: PageInfo;
    edges: ChannelEdge[];
}

export abstract class IQuery {
    abstract channel(id: ObjectID): Nullable<ChannelPayload> | Promise<Nullable<ChannelPayload>>;

    abstract adminChannels(admin: ObjectID, first: PositiveInt, after?: Nullable<string>): Nullable<ChannelPayload> | Promise<Nullable<ChannelPayload>>;

    abstract userChannels(user: ObjectID, first: PositiveInt, after?: Nullable<string>): ChannelPayload[] | Promise<ChannelPayload[]>;
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
    endCursor?: Nullable<string>;
    totalCount?: Nullable<number>;
}

export class Ping {
    id: ObjectID;
}

export class User {
    id: ObjectID;
}

export type ObjectID = typeof GraphQLObjectID;
export type PositiveInt = typeof GraphQLPositiveInt;
export type ChannelPayload = Channel | ChannelConnection | NotFoundError | UnknownError | UnauthorizedError | InternalServerError;
type Nullable<T> = T | null;
