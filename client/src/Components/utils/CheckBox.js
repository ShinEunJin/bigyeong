import React, { useState } from "react"
import { Checkbox, Collapse } from "antd"

//FindByMap 컴포넌트에서 사용
//category 분류

const { Panel } = Collapse

const region = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주특별자치도",
]

function CheckBox(props) {
  const [checked, setChecked] = useState([])

  const handleToggle = (value) => {
    let currentValue = checked.indexOf(value)
    let newChecked = [...checked]
    if (currentValue === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentValue, 1)
    }
    setChecked(newChecked)
    props.handleCheckFilter(newChecked)
  }

  return (
    <Collapse accordion>
      <Panel header="지역 선택">
        {region &&
          region.map((value, index) => (
            <Checkbox
              onChange={() => handleToggle(value)}
              checked={checked.indexOf(value) === -1 ? false : true}
              key={index}
            >
              {value}
            </Checkbox>
          ))}
      </Panel>
    </Collapse>
  )
}

export default CheckBox
