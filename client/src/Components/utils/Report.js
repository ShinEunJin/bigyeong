import React, { useState } from "react"
import { AiTwotoneAlert } from "react-icons/ai"
import { Modal } from "antd"
import axios from "axios"
import routes from "../../routes"

function Report({ report }) {
  const [isModalVisible, setIsModalVisible] = useState(false) //모달 창 보이기 유무

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = async () => {
    let body = { ...report }
    const { data } = await axios.post(routes.apiReport, body)
    if (data) {
      setIsModalVisible(false)
      alert(data.message)
    } else {
      setIsModalVisible(false)
      alert(
        "특정 오류로 인해 신고 접수가 실패하였습니다. 다시 시도해주시기 바랍니다."
      )
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <AiTwotoneAlert onClick={showModal} style={{ cursor: "pointer" }} />
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        신고를 하시려면 "확인" 버튼을 눌러주십시오.
      </Modal>
    </>
  )
}

export default Report
