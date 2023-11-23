import { Inject, Injectable } from '@nestjs/common';
import { CreatePingInput } from './graphql/ping.schema';
import { PingRepository } from '../prisma/prisma.service';
import { ACTIVITY_SERVICE, NEO4J_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CustomSnawflake } from 'libs/utils/snowflake';

@Injectable()
export class PingService {
  snowflake = new CustomSnawflake();
  constructor(
    private readonly repository: PingRepository,
    @Inject(ACTIVITY_SERVICE) private activityClient: ClientProxy,
    @Inject(NEO4J_SERVICE) private neo4jClient: ClientProxy,
  ) {}

  /* 
  ? Create new Ping
  * @param {CreatePingInput} input
  * @returns {Ping}
  */
  async createPing(input: CreatePingInput) {
    const { title, description, userID, picks, latitude, longitude, url } =
      input;

    const result = await this.repository.$transaction([
      this.repository.ping.create({
        data: {
          title,
          description,
          picks,
          url: url.toString(),
          userID: userID.toString(),
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(latitude.toString()),
              parseFloat(longitude.toString()),
            ],
          },
        },
      }),
    ]);

    await lastValueFrom(
      this.activityClient.emit<string, string>(
        'pingCreated',
        JSON.stringify(result[0]),
      ),
    );

    await lastValueFrom(
      this.neo4jClient.emit<string, string>(
        'pingCreated',
        JSON.stringify({
          id: result[0].id,
          userID: result[0].userID,
          picks: result[0].picks,
          location: [
            result[0].geometry.coordinates[0],
            result[0].geometry.coordinates[1],
          ],
          radius: result[0].radius,
        }),
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { geometry, radius, ...ping } = result[0];

    return {
      ...ping,
      latitude: geometry.coordinates[0],
      longitude: geometry.coordinates[1],
      radius,
    };
  }
}