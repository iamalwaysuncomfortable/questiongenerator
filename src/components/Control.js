import React, { Component } from 'react';

class Toggle extends Component {

    constructor (props){
        super(props);
        this.state = {isToggleOn:true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render(){
        return(
          <button onClick={this.handleClick}>
              {this.state.isToggleOn ? "FUCK":"YOU"}
          </button>
        );
    }
}

export default Toggle;