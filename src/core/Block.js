import css from './css/block.css'
import u from '../utils.js'
import { blocks } from '../blocks/types'

const Block = function (blocksElement, blockConfig, rootElement, projectConfig) {
  this.type = blockConfig.type
  this.index = blockConfig.index
  var blockInstance = null

  if (!this.type) {
    return console.warn('No `type` field found in block ' + this.index)
  }

  let step = 0

  const props = u.props(blockConfig.props)

  const child = u.div(`<div class="block ${css.block} b b${this.index} ${props.classes}" style="${props.styles}">
    <div class="backDecoration ${css.bdecoration}"></div>
    <div class="blockContainer ${css.inner}"></div>
    <div class="frontDecoration ${css.fdecoration}"></div>
  </div>`)
  this.el = child

  const blockContainer = child.querySelector('.blockContainer')

  if (!blocks[this.type]) {
    console.log(`block "${this.type}" not found`)
  } else {
    blockInstance = new blocks[this.type](blockContainer, blockConfig, rootElement, projectConfig)
  }

  this.beforeDestroy = () => {
    if (blockInstance && blockInstance.beforeDestroy) blockInstance.beforeDestroy()
  }

  this.stepForward = () => {
    step++
    if (blockInstance.stepForward) {
      blockInstance.stepForward(step)
    } else {
      console.warn(`The block "${this.type}" doesn't implement the method "stepForward" but this scene tried to use it`)
    }
  }

  this.destroy = () => {
    if (blockInstance && blockInstance.destroy) blockInstance.destroy()
  }

  blocksElement.appendChild(child)
}

export { Block }
