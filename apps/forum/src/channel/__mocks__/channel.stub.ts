import { Connection, ConnectionBuilder } from '@app/common';

import { Channel } from '../entity/channel.entity';

export const channelStub = (): Channel => {
  return {
    id: '61e4a1f5a6f2b941d59f8c8a',
    title: 'Test',
    admin: '5f7d4138e8017e001fd15e6a',
    activityId: '58a1d20c201f52270b89b2c9',
    createdAt: new Date('2022-01-16T22:53:41.000Z'),
    ping: { __typename: 'Ping', id: '58a1d20c201f52270b89b2c9' },
    participants: [{ __typename: 'User', id: '507f1f77bcf86cd799439011' }],
    messages: [
      {
        id: '61e4a1f5a6f2b941d59f8c8a',
        userId: '507f1f77bcf86cd799439011',
        channelId: '61e4a1f5a6f2b941d59f8c8a',
        text: 'Test',
      },
    ],
  };
};

export const prismaChannelStub = (): any => {
  return {
    id: '61e4a1f5a6f2b941d59f8c8a',
    title: 'Test',
    admin: '5f7d4138e8017e001fd15e6a',
    activityId: '58a1d20c201f52270b89b2c9',
    createdAt: new Date('2022-01-16T22:53:41.000Z'),
    ping: { __typename: 'Ping', id: '58a1d20c201f52270b89b2c9' },
    participants: ['507f1f77bcf86cd799439011'],
    messages: [
      {
        id: '61e4a1f5a6f2b941d59f8c8a',
        userId: '507f1f77bcf86cd799439011',
        channelId: '61e4a1f5a6f2b941d59f8c8a',
        text: 'Test',
      },
    ],
  };
};

export const paginatedChannelStub = (): Connection<Channel> => {
  return new ConnectionBuilder<Channel>()
    .setEdges([channelStub()])
    .setEndCursor([channelStub()])
    .setHasNextPage(false)
    .setTotalCount([channelStub()].length)
    .build();
};
