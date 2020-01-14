import * as Item from '../Item'
import { InputNumber } from 'antd'
import { useState, useEffect } from 'react'
import useSubscribe from '../../../../../../../../hooks/useSubscribe'
import editorStore from '../../../../../../../../store/editorStore'
import { px, noPx } from '../../../../../../../../utils/style'

export default function Margin() {
  const [value, setValue] = useState(0)
  const [editorState] = useSubscribe(editorStore)

  useEffect(() => {
    const { component } = editorStore.findComponent(editorState.key)

    if (!component) return

    setValue(noPx(component.style.margin))
  }, [editorState])

  function onInputChange(value) {
    editorStore.updateComponentStyle(editorState.key, {
      margin: px(value)
    })
  }

  return (
    <Item.Panel>
      <Item.Row>
        <Item.Label>margin</Item.Label>
        <InputNumber
          formatter={value => `${value}px`}
          parser={value => value.replace('px', '')}
          size='small'
          style={{ flex: 1 }}
          value={value}
          onChange={onInputChange}></InputNumber>
      </Item.Row>
    </Item.Panel>
  )
}