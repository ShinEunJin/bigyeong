import Product from "../models/Product"

export const uploadImages = (req, res) => {
    const { file } = req
    try {
        return res.json({
            success: true,
            filePath: file.path,
            fileName: file.filename
        })
    } catch (error) {
        return res.json({ success: false, error })
    }
}

export const uploadProduct = async (req, res) => {
    const { body } = req
    try {
        const product = new Product(body)
        await product.save()
        return res.status(200).json({ success: true, product })
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}

export const deployProduct = async (req, res) => {
    let {
        body: { skip, limit }
    } = req
    skip = parseInt(skip) || 0
    limit = parseInt(limit) || 8
    try {
        const productInfo = await Product.find().skip(skip).limit(limit).populate("writer")
        return res.status(200).json({ success: true, productInfo, productLen: productInfo.length })
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}