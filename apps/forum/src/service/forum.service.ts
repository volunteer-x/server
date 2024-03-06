import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/forum';

@Injectable()
export class ForumRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
