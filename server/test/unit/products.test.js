import { getProduct } from "../../controllers/product/product"
describe("Product controller Get", () => {
  it("should have getProduct", () => {
    expect(typeof getProduct).toBe("function")
  })
})
