import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PingService } from './ping.service';
import {
  CreatePingInput,
  Ping,
  UPingInput,
  UPingsWithinRadiusInput,
} from './graphql/ping.schema';
import { Logger, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@app/auth';
import { User } from 'libs/utils/entities';
import { decodeFromBase64, encodeToBase64 } from 'libs/utils/helpers';

@Resolver('Ping')
export class PingResolver {
  constructor(private readonly pingService: PingService) {}
  private readonly logger = new Logger(PingResolver.name);

  @Mutation('createPing')
  @UseGuards(GqlAuthGuard)
  create(@Args('payload') payload: CreatePingInput) {
    return this.pingService.createPing(payload);
  }

  @Mutation('updatePing')
  updateMedia(@Args('id') id: string, @Args('payload') payload: UPingInput) {
    return this.pingService.updatePing(id, payload);
  }

  @Query('getPing')
  @UseGuards(GqlAuthGuard)
  getPing(@Args('id') id: string, @CurrentUser() user: User) {
    return this.pingService.getPing(id, user.id);
  }

  @Query('getAllPing')
  @UseGuards(GqlAuthGuard)
  async getAllPing(
    @Args('first') first: number,
    @Args('after') after: string,
    @CurrentUser() user: User,
    @Args('userID') userID?: string,
  ) {
    userID = userID ? userID : user.id;

    const pings = await this.pingService.getAllPing(
      userID,
      first,
      decodeFromBase64(after),
    );

    return {
      edges: pings.map((ping) => ({
        node: ping,
        cursor: encodeToBase64(ping.id),
      })),
      owner: { __typename: 'User', id: userID },
      pageInfo: {
        hasNextPage: pings.length === first,
        endCursor:
          pings.length > 0 ? encodeToBase64(pings[pings.length - 1].id) : null,
      },
    };
  }

  @Query('getPingsWithinRadius')
  @UseGuards(GqlAuthGuard)
  async getPingsWithinRadius(
    @Args('payload') payload: UPingsWithinRadiusInput,
    @CurrentUser() user,
  ) {
    return this.pingService.getPingsWithinRadius(payload);
  }

  @ResolveField('user')
  user(@Parent() ping: Ping) {
    this.logger.log('ping', ping.userID);
    return { __typename: 'User', id: ping.userID };
  }
}
