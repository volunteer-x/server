import { ConnectionBuilder } from './connectionBuilder';
import { Cursor } from '../cursor';
import { PageInfo } from './pageInfo';
describe('ConnectionBuilder', () => {
  it('should set the endCursor on the connection', () => {
    const input = [{ id: '123' }, { id: '456' }];
    const cursor = new Cursor({ id: input[input.length - 1].id });

    const connectionBuilder = new ConnectionBuilder();
    connectionBuilder.setEndCursor(input);
    const connection = connectionBuilder.build();

    expect(connection.pageInfo.endCursor).toBe(cursor.encode());
  });

  it('should return null when the input array length is 0', () => {
    const connectionBuilder = new ConnectionBuilder();
    const input = [];
    connectionBuilder.setEndCursor(input);
    const connection = connectionBuilder.build();
    expect(connection.pageInfo.endCursor).toBe(null);
  });

  it('should set the edges on the connection', () => {
    const input = [{ id: '123' }, { id: '456' }];
    const connectionBuilder = new ConnectionBuilder();
    connectionBuilder.setEdges(input);
    const connection = connectionBuilder.build();

    expect(connection.edges.length).toBe(input.length);
    for (let i = 0; i < input.length; i++) {
      const expectedCursor = new Cursor({ id: input[i].id }).encode();
      expect(connection.edges[i].node).toBe(input[i]);
      expect(connection.edges[i].cursor).toBe(expectedCursor);
    }
  });

  it('should be able to set all properties and build the connection object', () => {
    const pageInfo = {
      endCursor: 'eyJpZCI6Ijc4OSJ9',
      hasNextPage: true,
      totalCount: 3,
    };

    const input = [
      { id: '123', name: 'test' },
      { id: '456', name: 'test1' },
      { id: '789', name: 'test2' },
    ];

    const edges = [
      { node: { id: '123', name: 'test' }, cursor: 'eyJpZCI6IjEyMyJ9' },
      { node: { id: '456', name: 'test1' }, cursor: 'eyJpZCI6IjQ1NiJ9' },
      { node: { id: '789', name: 'test2' }, cursor: 'eyJpZCI6Ijc4OSJ9' },
    ];

    const connection = new ConnectionBuilder()
      .setEndCursor(input)
      .setHasNextPage(pageInfo.hasNextPage)
      .setTotalCount(pageInfo.totalCount)
      .setEdges(input)
      .build();

    expect(connection.pageInfo).toBeInstanceOf(PageInfo);
    expect(connection.pageInfo.endCursor).toBe(pageInfo.endCursor);
    expect(connection.pageInfo.hasNextPage).toBe(pageInfo.hasNextPage);
    expect(connection.pageInfo.totalCount).toBe(pageInfo.totalCount);
    expect(connection.edges).toStrictEqual(edges);
  });
});
