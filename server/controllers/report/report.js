import Report from "../../models/Report"

//신고 하기 기능
export const report = async (req, res) => {
  const {
    body: { category, id },
  } = req
  try {
    //category는 신고 된 항목의 종류 (댓글인지, 컨텐츠인지 등등 확인)
    //id는 ObjectId를 표시
    let report = await Report.findOne({ [category]: id })
    if (report) {
      report.number++
      await report.save()
    } else {
      report = new Report({ [category]: id, category })
      await report.save()
    }
    return res
      .status(200)
      .json({ success: true, message: "정상적으로 신고가 접수 되었습니다." })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "서버 오류로 인해 신고 접수가 실패하였습니다. 다시 시도해주시기 바랍니다.",
    })
  }
}
