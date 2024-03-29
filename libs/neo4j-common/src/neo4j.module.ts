import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Neo4jCommonService } from './neo4j.service';
import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { createDriver } from './neo4j.util';
import { Neo4jTransactionInterceptor } from './neo4j-transaction.interceptor';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class Neo4jCommonModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jCommonModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jCommonService,
      ],
      exports: [Neo4jCommonService, Neo4jTransactionInterceptor],
    };
  }

  static forRootAsync(configProvider): DynamicModule {
    return {
      module: Neo4jCommonModule,
      global: true,
      imports: [ConfigModule],
      providers: [
        {
          provide: NEO4J_CONFIG,
          ...configProvider,
        } as Provider<any>,
        {
          provide: NEO4J_DRIVER,
          inject: [NEO4J_CONFIG],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jCommonService,
      ],
      exports: [Neo4jCommonService],
    };
  }
}
