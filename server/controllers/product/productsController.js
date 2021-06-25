import Product from "../../models/Product"

export const getProductsBySearch = async (req, res) => {
  const {
    query: { sortBy, skip, limit, region, searchTerm },
  } = req
  let skipToNum = parseInt(skip, 10)
  let limitToNum = parseInt(limit, 10)
  try {
    if (searchTerm !== "") {
      const products = await Product.find(
        region === ""
          ? {
              name: { $regex: searchTerm, $options: "i" },
            }
          : {
              region1: { $in: region.split(",") },
              name: { $regex: searchTerm, $options: "i" },
            }
      )
        .sort(
          sortBy === "popular"
            ? { views: -1 }
            : sortBy === "like"
            ? { likes: -1 }
            : sortBy === "new"
            ? { createdAt: -1 }
            : { views: -1 }
        )
        .skip(skipToNum)
        .limit(limitToNum)
      return res.status(200).json({ success: true, products })
    } else {
      const products = await Product.find(
        region === ""
          ? {}
          : {
              region1: { $in: region.split(",") },
            }
      )
        .sort(
          sortBy === "popular"
            ? { views: -1 }
            : sortBy === "like"
            ? { likes: -1 }
            : sortBy === "new"
            ? { createdAt: -1 }
            : { views: -1 }
        )
        .skip(skipToNum)
        .limit(limitToNum)
      return res.status(200).json({ success: true, products })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

export const getProductsByMap = async (req, res) => {
  let {
    query: { filter, limit, skip },
  } = req

  skip = parseInt(skip) || 0
  limit = parseInt(limit) || 10

  try {
    const productLen = (await Product.find({ region1: filter })).length
    const product = await Product.find({ region1: filter })
      .skip(skip)
      .limit(limit)
    return res.status(200).json({ success: true, product, productLen })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
