import { Connection } from './connection';
import { Cursor } from '../cursor';
import { CursorParams } from '../cursor/Cursor.interface';
import { Edge } from './edge';
import { PageInfo } from './pageInfo';

interface Builder<T> {
  setHasNextPage(length: number, first: number): this;
  setEndCursor(node: Array<T>): this;
  setEdges(edges: T[]): this;
}

export class ConnectionBuilder<T extends CursorParams> implements Builder<T> {
  private connection: Connection<T>;
  private pageInfo: PageInfo;
  private edges: Edge<T>[];

  constructor() {
    this.connection = new Connection<T>();
    this.pageInfo = new PageInfo();
    this.edges = new Array<Edge<T>>();
  }
  /**
   * Sets the edges of the connection.
   *
   * @param edges - An array of edges to set.
   * @returns The instance of the connection builder.
   */
  setEdges(edges: Array<T>): this {
    edges.map((edge) => {
      const cursor = new Cursor({ id: edge.id });
      this.edges.push({ node: edge, cursor: cursor.encode() });
    });
    return this;
  }

  /**
   * Sets the total count of items in the connection.
   *
   * @param totalCount - The total count of items.
   * @returns The instance of the connection builder.
   */
  setTotalCount(totalCount: number): this {
    this.pageInfo.setTotalCount(totalCount);
    return this;
  }

  /**
   * Sets the value of the "hasNextPage" flag in the `pageInfo` object based on the length and first parameters.
   * @param totalCount - The total count of the data.
   * @param perPage - The number of items per page.
   * @returns The current instance of the `ConnectionBuilder` class.
   */
  setHasNextPage(totalCount: number, perPage: number): this {
    this.pageInfo.setHasNextPage(totalCount > perPage);
    return this;
  }

  /**
   * Sets the end cursor for the connection.
   *
   * @param node - The array of nodes.
   * @returns The connection builder instance.
   */
  setEndCursor(node: Array<T>): this {
    if (node.length <= 0) {
      this.pageInfo.setEndCursor(null);
      return this;
    }

    const cursor = new Cursor({ id: node[node.length - 1].id });

    this.pageInfo.setEndCursor(cursor.encode());

    return this;
  }

  /**
   * Builds the connection object with the specified pageInfo and returns it.
   * @returns The built connection object.
   */
  build(): Connection<T> {
    this.connection.pageInfo = this.pageInfo;
    this.connection.edges = this.edges;
    return this.connection;
  }
}
