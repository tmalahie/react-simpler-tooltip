import React from 'react'
import ReactDOM from 'react-dom'

class Tooltip extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillUnmount() {
    this.mouseout()
  }

  absolutePosition(el) {
    let boundingRect = el.getBoundingClientRect();
    let baseRect = document.documentElement.getBoundingClientRect();

    let left = boundingRect.left - baseRect.left,
      top = boundingRect.top - baseRect.top,
      width = boundingRect.right - boundingRect.left,
      height = boundingRect.bottom - boundingRect.top,
      right = left + width,
      bottom = top + height;

    return {
        left: left,
        top: top,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height,

        rLeft: boundingRect.left,
        rTop: boundingRect.top,
        rRight: boundingRect.right,
        rBottom: boundingRect.bottom
    }
  }

  mouseover() {
    if (this.tooltipCtn) return
    let eltBounds = this.absolutePosition(this.target)
    let bodyW = document.documentElement.scrollWidth
    let bodyH = document.documentElement.scrollHeight
    let rBodyW = document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth
    let rBodyH = document.documentElement.clientHeight||document.body.clientHeight||window.innerHeight
    let placement = this.props.placement
    if (!placement || "auto" === placement) {
      let centerW = eltBounds.left+eltBounds.width/2
      let verticalW = 2*Math.min(bodyW-centerW,centerW)
      let leftW = eltBounds.left
      let rightW = rBodyW-eltBounds.right
      if (verticalW > Math.max(leftW,rightW)) {
        let topH = eltBounds.rTop
        let bottomH = rBodyH-eltBounds.rBottom
        if (topH > bottomH)
          placement = "top"
        else
          placement = "bottom"
      }
      else {
        if (leftW > rightW)
          placement = "left"
        else
          placement = "right"
      }
    }
    let tooltipCtn = document.createElement("div")
    tooltipCtn.className = "simpler-tooltip simpler-tooltip-"+placement
    if (this.props.tooltipClass)
      tooltipCtn.className += " "+ this.props.tooltipClass
    switch (placement) {
    case "left":
      tooltipCtn.style.right = Math.round(rBodyW-eltBounds.left+4) +"px"
      tooltipCtn.style.top = "0px"
      break
    case "top":
      tooltipCtn.style.left = "0px"
      tooltipCtn.style.bottom = Math.round(rBodyH-eltBounds.top+4) +"px"
      break
    case "right":
      tooltipCtn.style.left = Math.round(eltBounds.right+4) +"px"
      tooltipCtn.style.top = "0px"
      break
    case "bottom":
      tooltipCtn.style.left = "0px"
      tooltipCtn.style.top = Math.round(eltBounds.bottom+4) +"px"
      break
    }
    ReactDOM.render([
      <div className="simpler-tooltip-diamond" key="simpler-tooltip-diamond"></div>,
      <div className="simpler-tooltip-content" key="simpler-tooltip-content" style={this.props.tooltipStyle}>{this.props.content}</div>
    ], tooltipCtn)
    document.body.appendChild(tooltipCtn)
    this.tooltipCtn = tooltipCtn
    switch (placement) {
    case "top":
    case "bottom":
      let tooltipW = tooltipCtn.scrollWidth
      let centerW = eltBounds.left+eltBounds.width/2
      let availableW = 2*Math.min(bodyW-centerW,centerW)-4
      if (tooltipW < availableW)
        tooltipCtn.style.left = Math.round(centerW-(tooltipW+4)/2)+"px"
      else {
        tooltipCtn.style.left = Math.round(centerW-availableW/2)+"px"
        tooltipCtn.style.width = Math.round(availableW)+"px"
      }
      break
    case "left":
    case "right":
      let tooltipH = tooltipCtn.scrollHeight
      let centerH = eltBounds.top+eltBounds.height/2
      tooltipCtn.style.top = Math.round(centerH-(tooltipH+4)/2)+"px"
      break
    }
    if (this.props.onShow)
      this.props.onShow({target:tooltipCtn})
  }
  mouseout() {
    let tooltipCtn = this.tooltipCtn
    if (tooltipCtn) {
      document.body.removeChild(tooltipCtn)
      this.tooltipCtn = null
      this.clicked = false
      if (this.props.onHide)
        this.props.onHide({target:tooltipCtn})
    }
  }
  click() {
    if (this.clicked)
      this.mouseout()
    else {
      this.mouseover()
      this.clicked = true
    }
  }

  render() {
    let className = this.props.className ? "simpler-tooltip-trigger "+this.props.className : "simpler-tooltip-trigger"
    return <div className={className} style={this.props.style} onMouseOver={this.mouseover.bind(this)} onMouseOut={this.mouseout.bind(this)} onClick={this.click.bind(this)} ref={elt => this.target=elt}>
      {this.props.children}
    </div>
  }
}

export default Tooltip