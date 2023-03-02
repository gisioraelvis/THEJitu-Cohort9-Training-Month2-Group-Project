import * as mssql from "mssql";
import { sqlConfig } from "../config/db";

export class DatabaseUtils {
  private pool: Promise<mssql.ConnectionPool>;
  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }

  createRequest(
    request: mssql.Request,
    data: { [x: string]: string }
  ): mssql.Request {
    const keys = Object.keys(data);
    keys.map((keyName) => {
      request.input(keyName, data[keyName]);
    });

    return request;
  }

  async exec(
    storedProcedure: string,
    data: { [x: string]: any } = {}
  ): Promise<mssql.IResult<any>> {
    let emptyRequest = (await this.pool).request();

    let request = this.createRequest(
      emptyRequest,
      data as { [x: string]: string }
    );

    let result = await request.execute(storedProcedure);
    return result;
  }

  async query(queryString: string): Promise<mssql.IResult<any>> {
    return await (await this.pool).request().query(queryString);
  }
}
