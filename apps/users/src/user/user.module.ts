import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import {
  DateTimeResolver,
  EmailAddressResolver,
  LatitudeResolver,
  LongitudeResolver,
  ObjectIDResolver,
} from 'graphql-scalars';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { NEO4J_SERVICE, RmqModule } from '@app/common';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from '@app/auth';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { PayloadResolver } from './payload.resolver';
import { PrismaModule } from '@app/prisma';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/user.gql', 'libs/utils/errors.gql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      resolvers: {
        DateTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        ObjectID: ObjectIDResolver,
        Latitude: LatitudeResolver,
        Longitude: LongitudeResolver,
      },
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    AuthModule,
    PrismaModule.register({ logQueries: false }),
    // RmqModule,
    // RmqModule.register({ name: [NEO4J_SERVICE] }),
  ],
  // controllers: [UserController],
  providers: [UserResolver, PayloadResolver, UserService],
})
export class UserModule {}
