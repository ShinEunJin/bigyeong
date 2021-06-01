import React, { useState } from "react"
import { Checkbox, Collapse } from "antd"

const { Panel } = Collapse

const region = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주도",
]

function CheckBox(props) {
  const [checked, setChecked] = useState([])

  const handleToggle = (value) => {
    const currentValue = checked.indexOf(value)
    const newChecked = [...checked]
    if (currentValue === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentValue, 1)
    }
    setChecked(newChecked)
    /* props.handleCheckFilter(newChecked) */
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
