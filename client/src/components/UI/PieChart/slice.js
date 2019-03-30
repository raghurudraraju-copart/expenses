import React, { Component } from 'react';
import d3 from 'd3'

function translate(x, y) {
  return `translate(${x}, ${y})`;
}

class Slice extends React.Component {
  render() {
    let {value, label, fill, innerRadius = 0, outerRadius} = this.props;
    let arc = d3.svg.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    let renderLabel = (value) => {
      console.log(value)

      //var thisText = document.getElementById(value.data.label + '_text')
      //var thisTextWidth = thisText.clientWidth;

      var labelLength = 0;
      if ((value.endAngle + value.startAngle) / 2 > Math.PI) {
        return -35 - 130;
      } else {
        return -25;
      }
    }

    let renderTextAnchor = (value) => (value.endAngle + value.startAngle) / 2 > Math.PI ? 'end' : 'start'
    let renderX = (value) => (value.endAngle + value.startAngle) / 2 > Math.PI ? (arc.centroid(value)[0] * 2)+60 : (arc.centroid(value)[0] * 2)-40;
    let renderY = (value) => (value.endAngle + value.startAngle) / 2 > Math.PI ? (arc.centroid(value)[1] * 2)+40 : (arc.centroid(value)[1] * 2)-40;

    return (
      <g>
        <path d={arc(value)} fill={fill} />
        {/* https://github.com/d3/d3/wiki/SVG-Shapes#arc_centroid */}
        <text transform={translate(...arc.centroid(value))}
              dy=".35em"
              textAnchor={renderTextAnchor(value)}
              x={renderX(value)}
              y={renderY(value)}
              //y= {(arc.centroid(value)[1] * 2)+30}
              //x={(arc.centroid(value)[0] * 2)-50}
              className="label">
          {label}
        </text>
      </g>
    );
  }
}

export default Slice
