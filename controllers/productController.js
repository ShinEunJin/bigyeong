import Product from "../models/Product"
import User from "../models/User"

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

export const likeProduct = async (req, res) => {
    const {
        body: { productId, userId }
    } = req
    try {
        const user = await User.findOne({ _id: userId })
        let alreadyLike = false
        user.likes.forEach(item => {
            if (item.id === productId) {
                alreadyLike = true
            }
        })
        if (alreadyLike) {
            const product = await Product.findOneAndUpdate(
                { _id: productId },
                {
                    $inc: { likes: -1 }
                },
                { new: true }
            )
            return res.status(200).json({ success: true, likes: product.likes })
        } else {
            const product = await Product.findOneAndUpdate(
                { _id: productId },
                {
                    $inc: { likes: 1 }
                },
                { new: true }
            )
            return res.status(200).json({ success: true, likes: product.likes })
        }
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}