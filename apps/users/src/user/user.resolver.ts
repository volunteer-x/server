import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './graphql/user.schema';
import { GraphQLObjectID } from 'graphql-scalars';
import { Logger, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '@app/auth';
import { User } from '@user/entity/user.entity';
import { Payload, WrappedPayload } from '@app/common';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  private readonly logger = new Logger(UserResolver.name);

  @Query('user')
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser() user: Payload<User>) {
    return WrappedPayload.wrap<User>(user);
  }

  @Query('isUsernameAvailable')
  isUsernameAvailable(@Args('username') username: string) {
    return this.usersService.isUsernameAvailable(username);
  }

  @UseGuards(GqlAuthGuard)
  @Query('userById')
  async getUserById(
    @Args({ name: 'id' })
    id: typeof GraphQLObjectID,
  ) {
    const result = await this.usersService.getUserById(
      GraphQLObjectID.parseValue(id),
    );

    this.logger.log(result);

    return WrappedPayload.wrap<User>(result);
  }

  @Mutation('createUser')
  async create(@Args('payload') payload: CreateUserInput) {
    const result = await this.usersService.createUser(
      User.ToEntityFromInput(payload),
    );

    const wrapped = WrappedPayload.wrap<User>(result);
    return wrapped;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateUser')
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    const result = await this.usersService.update(
      User.ToEntityFromUpdate(payload),
    );
    return WrappedPayload.wrap(result);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: typeof GraphQLObjectID;
  }) {
    return this.usersService.getUserById(
      GraphQLObjectID.parseValue(reference.id),
    );
  }

  // @ResolveField('ping')
  // pings(@Parent() user: User) {
  //   this.logger.log('user', user);
  //   return { __typename: 'User', id: user.id };
  // }
}
