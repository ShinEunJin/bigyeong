import React, { useState } from "react"
import { Checkbox, Collapse } from "antd"

const { Panel } = Collapse

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
    props.handleCheckFilter(newChecked)
  }

  return (
    <Collapse accordion>
      <Panel header="도시 선택">
        {props.list &&
          props.list.map((value, index) => (
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
