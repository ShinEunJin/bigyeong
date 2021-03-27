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