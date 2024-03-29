import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  Result,
  isDate,
  isDateTime,
  isDuration,
  isInt,
  isLocalDateTime,
  isLocalTime,
  isNode,
  isPoint,
  isRelationship,
  isTime,
} from 'neo4j-driver';
import { Observable, map } from 'rxjs';

const toNative = (
  value: any,
  showLabelsOrType?: boolean,
  showIdentity?: boolean,
) => {
  if (value === null || value === undefined) return undefined;
  else if (value instanceof Result || value.records) {
    return value.records?.map((row) =>
      Object.fromEntries(row.keys.map((key) => [key, toNative(row.get(key))])),
    );
  } else if (Array.isArray(value)) return value.map((v) => toNative(v));
  else if (isNode(value))
    return toNative({
      _id: showIdentity ? toNative(value.identity) : null,
      _labels: showLabelsOrType ? toNative(value.labels) : null,
      ...toNative(value.properties),
    });
  else if (isRelationship(value))
    return toNative({
      _id: toNative(value.identity),
      _type: showLabelsOrType ? toNative(value.type) : null,
      ...toNative(value.properties),
    });
  else if (isInt(value)) return value.toNumber();
  else if (
    isDuration(value) ||
    isLocalTime(value) ||
    isTime(value) ||
    isDate(value) ||
    isDateTime(value) ||
    isLocalDateTime(value)
  ) {
    return value.toString();
  }
  if (isPoint(value)) {
    switch (value.srid.toNumber()) {
      case 4326:
        return { longitude: value.y, latitude: value.x }; // WGS 84 2D
      case 4979:
        return { longitude: value.y, latitude: value.x, height: value.z }; // WGS 84 3D
      default:
        toNative({ x: value.x, y: value.y, z: value.z }); // Cartesian
    }
  } else if (typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value).map((key) => [
        key,
        toNative(value[key], showLabelsOrType, showIdentity),
      ]),
    );
  }
  return value;
};

@Injectable()
export class Neo4jTypeInterceptor implements NestInterceptor {
  constructor(
    private readonly showLabelsOrType: boolean = false,
    private readonly showIdentity: boolean = false,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => toNative(data, this.showLabelsOrType, this.showIdentity)),
      );
  }
}
