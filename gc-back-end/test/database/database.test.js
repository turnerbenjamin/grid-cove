import { expect } from "chai";
import mongoose from "mongoose";
import sinon from "sinon";

import Database from "../../src/database/database.js";

describe("Database tests: ", () => {
  const testURI = "testURI";
  let mockServer;
  let testDatabase;
  let connectStub;

  beforeEach(() => {
    connectStub = sinon.stub(mongoose, "connect");
    mockServer = { close: sinon.spy() };
    testDatabase = new Database(testURI, mockServer);
  });

  afterEach(() => {
    connectStub.restore();
    mockServer = null;
    testDatabase = null;
  });

  it("should call mongoose connect with the correct URI", async () => {
    //Arrange
    const expected = testURI;
    connectStub.resolves();
    //Act
    testDatabase.connect();
    //Assert
    expect(connectStub.calledWith(expected)).to.equal(true);
  });

  it("should call close on the server if connect rejects", async () => {
    //Arrange
    connectStub.rejects();
    //Act
    await testDatabase.connect();
    //Assert
    expect(mockServer.close.calledOnce).to.equal(true);
  });
});
