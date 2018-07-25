import React, { Component } from 'react'

class ListItem extends Component {
  render() {

    return(
      <li className="list-item">{this.props.name}</li>
    )
  }
}

export default ListItem