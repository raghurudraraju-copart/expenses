import React, { Component } from 'react';
import d3 from 'd3'

import Slice from './slice';

function translate(x, y) {
  return `translate(${x}, ${y})`;
}

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.colorScale = d3.scale.category10();
    this.renderSlice = this.renderSlice.bind(this);
  }

  render() {
    let {x, y, data} = this.props;
    //let dataValues = data.value;
    let pie = d3.layout.pie().value((d) => d.value);
    let pieValues = pie(data);
    return (
      <g transform={translate(x, y)}>
        {pieValues.map(
          (value, i) =>
          this.renderSlice(value, i))
        }
      </g>
    );
  }

  renderSlice(value, i) {
    return (
      <Slice key={i}
             outerRadius={this.props.radius}
             value={value}
             label={value.data.label}
             fill={this.colorScale(i)} />
    );
  }
}

export default Pie
