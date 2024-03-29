import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRIMSA_OPTIONS, PrismaModuleOptions } from './prisma.provider';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();

  constructor(@Inject(PRIMSA_OPTIONS) options: PrismaModuleOptions) {
    super({
      errorFormat: 'minimal',
      log: options.logQueries
        ? [
            {
              emit: 'event',
              level: 'query',
            },
          ]
        : undefined,
    });

    // if (options.logQueries) {
    //   this.$on(
    //     'query' as any,
    //     createPrismaQueryEventHandler({
    //       logger: (query) => {
    //         this.logger.verbose(query, 'PrismaClient');
    //       },
    //       format: false,
    //       colorQuery: '\u001B[96m',
    //       colorParameter: '\u001B[90m',
    //     }),
    //   );
    // }
  }

  async onModuleInit() {
    await this.$connect();
  }

  // async enableShutdownHooks(app: INestApplication) {
  //   this.$on('beforeExit', async () => {
  //     await app.close();
  //   });
  // }
}
