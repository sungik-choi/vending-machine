import { customFetch } from "../src/util/fetch";
import MockItemData from "../src/util/mockItemData";

test("fetch 테스트", async () => {
  const data = await customFetch("http://localhost:3000/beverages");
  expect(data).toEqual(MockItemData);
});
