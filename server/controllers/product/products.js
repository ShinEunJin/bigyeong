import Product from "../../models/Product"

export const getProductsBySearch = async (req, res) => {
  let {
    query: { sortBy, skip, limit, region, searchTerm },
  } = req
  skip = parseInt(skip, 10)
  limit = parseInt(limit, 10)
  try {
    // 처음 분류 기준은 검색 단어가 있는지 판별하기
    // 검색어 있을 때
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
        .skip(skip)
        .limit(limit)
      return res.status(200).json({ success: true, products })
    } else {
      //검색어 없을 때
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
        .skip(skip)
        .limit(limit)
      return res.status(200).json({ success: true, products })
    }
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}

//countDocument는 너무 느려서 find후 길이를 구하기
export const getProductsByMap = async (req, res) => {
  let {
    query: { left, right, top, bottom, limit, skip },
  } = req
  skip = parseInt(skip) || 0
  limit = parseInt(limit) || 10
  try {
    // left, right, top, bottom 은 홈화면의 카테고리 컴포넌트에서 '지도로 찾기'
    // 를 누를때 주는 좌표 제공
    const [productLen, product] = await Promise.all([
      Product.find({
        $and: [
          { "coord.lng": { $gte: Number(left), $lte: Number(right) } },
          { "coord.lat": { $gte: Number(bottom), $lte: Number(top) } },
        ],
      }).limit(100),
      Product.find({
        $and: [
          { "coord.lng": { $gte: Number(left), $lte: Number(right) } },
          { "coord.lat": { $gte: Number(bottom), $lte: Number(top) } },
        ],
      })
        .skip(skip)
        .limit(limit),
    ])
    return res
      .status(200)
      .json({ success: true, product, productLen: productLen.length })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
