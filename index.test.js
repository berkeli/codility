import supertest from "supertest";
import createServer from "./createServer";
const app = createServer();

describe("TaskRunner tests", () => {
  it("Server should be running", async () => {
    await supertest(app).get("/").expect(200).expect("Hello World!");
  });

  it("Should return 400 when invalid taskIds are passed", async () => {
    await supertest(app)
      .post("/api/runTasks")
      .set('Content-type', 'application/json')
      .send({taskIds: ["id0"]})
      .expect(400);
  });

  it("Returns 200 when valid taskIds are passed", async () => {
    await supertest(app)
      .post("/api/runTasks")
      .set('Content-type', 'application/json')
      .send({taskIds: ["id1", "id2"]})
      .expect(200);
  });

  it("Returns Ids in order of execution", async () => {
    await supertest(app)
      .post("/api/runTasks")
      .set('Content-type', 'application/json')
      .send({taskIds: ["id1", "id2"]})
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([0, 1]);
      });
  });

  it("Returns -1 when there are tasks completed before", async () => {
    await supertest(app)
      .post("/api/runTasks")
      .set('Content-type', 'application/json')
      .send({taskIds: ["id2", "id1"]})
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([0, -1]);
      });
  });

  it("solution 6 task IDs are passed on, the tasks have finished in the order: 2, 1, 0, 4, 5, 3", async () => {
    await supertest(app)
      .post("/api/runTasks")
      .set('Content-type', 'application/json')
      .send({ taskIds: ["id3", "id2", "id1", "id6", "id4", "id5"] })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([0, -1, -1, 3, -1, -1]);
      });
  });
});
