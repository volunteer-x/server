/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { GraphQLDateTime, GraphQLObjectID, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars'

export interface CreatePingInput {
    userID: ObjectID;
    title: string;
    picks: string[];
    longitude: Longitude;
    latitude: Latitude;
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
}

export interface UPingInput {
    title?: Nullable<string>;
    picks?: Nullable<string[]>;
    longitude?: Nullable<Longitude>;
    latitude?: Nullable<Latitude>;
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
    media?: Nullable<Nullable<MediaInput>[]>;
}

export interface MediaInput {
    key: string;
    type: string;
}

export interface UPingsWithinRadiusInput {
    longitude: Longitude;
    latitude: Latitude;
    radius: number;
}

export interface Media {
    key: string;
    type: string;
}

export interface Ping {
    id: ObjectID;
    title: string;
    userID: string;
    user: User;
    longitude: Longitude;
    latitude: Latitude;
    picks: string[];
    description?: Nullable<string>;
    url?: Nullable<URL>;
    radius?: Nullable<number>;
    createdAt?: Nullable<DateTime>;
    media?: Nullable<Nullable<Media>[]>;
    participants?: Nullable<Nullable<User>[]>;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage?: Nullable<boolean>;
    startCursor?: Nullable<string>;
    endCursor?: Nullable<string>;
}

export interface PingEdge {
    cursor: string;
    node: Ping;
}

export interface PingConnection {
    totalCount?: Nullable<number>;
    edges: PingEdge[];
    owner?: Nullable<User>;
    pageInfo: PageInfo;
}

export interface GetParticipantsResponse {
    totalCount: number;
    members?: Nullable<User[]>;
}

export interface IQuery {
    getPing(id: ObjectID): Ping | Promise<Ping>;
    getAllPing(first: number, after?: Nullable<string>, userID?: Nullable<string>): PingConnection | Promise<PingConnection>;
    getPingsWithinRadius(payload: UPingsWithinRadiusInput, first: number, after?: Nullable<string>, picks?: Nullable<Nullable<string>[]>): Nullable<PingConnection> | Promise<Nullable<PingConnection>>;
    getParticipants(pingID: ObjectID, first?: Nullable<number>, after?: Nullable<string>): GetParticipantsResponse | Promise<GetParticipantsResponse>;
}

export interface User {
    id: ObjectID;
    pings?: Nullable<Nullable<Ping>[]>;
}

export interface IMutation {
    createPing(payload: CreatePingInput): Ping | Promise<Ping>;
    updatePing(id: ObjectID, payload: UPingInput): Ping | Promise<Ping>;
    addParticipant(id: ObjectID, userID: ObjectID): boolean | Promise<boolean>;
    removeParticipant(id: ObjectID, userID: ObjectID): string | Promise<string>;
}

export type Longitude = typeof GraphQLLongitude;
export type Latitude = typeof GraphQLLatitude;
export type URL = typeof GraphQLURL;
export type DateTime = typeof GraphQLDateTime;
export type ObjectID = typeof GraphQLObjectID;
type Nullable<T> = T | null;
