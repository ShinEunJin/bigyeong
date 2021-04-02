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
        body: { skip, limit, filters, searchTerm }
    } = req
    let findArgs = {}

    skip = parseInt(skip) || 0
    limit = parseInt(limit) || 8

    for (let key in filters) {
        if (filters[key].length > 0) {
            findArgs[key] = filters[key]
        }
    }

    if (searchTerm) {
        try {
            const productInfo = await Product.find(findArgs).find({ name: { $regex: searchTerm, $options: "i" } }).populate("writer").skip(skip).limit(limit)
            return res.status(200).json({ success: true, productInfo, productLen: productInfo.length })
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    } else {
        try {
            const productInfo = await Product.find(findArgs).populate("writer").skip(skip).limit(limit)
            return res.status(200).json({ success: true, productInfo, productLen: productInfo.length })
        } catch (error) {
            return res.status(400).json({ success: false, error })
        }
    }
}

export const detailProduct = async (req, res) => {
    const {
        query: { id }
    } = req
    try {
        const product = await Product.find({ _id: id })
        return res.status(200).json({ success: true, product })
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}