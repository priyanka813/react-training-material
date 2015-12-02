////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Use TweenStateMixin to animate a sliding animation
// - Experiment with different types of easing (hint: use easingTypes at 
//   https://github.com/chenglou/tween-functions/blob/master/index.js)
//
// Got more time?
//
// - Use a <Spring> to animate the transition
////////////////////////////////////////////////////////////////////////////////

const React = require('react/addons')
const easingTypes = require('react-tween-state').easingTypes
const TweenStateMixin = require('react-tween-state').Mixin
const { Spring } = require('react-motion')

const { bool, number } = React.PropTypes

require('./styles')

const ToggleSwitch = React.createClass({

  mixins: [ TweenStateMixin ],

  propTypes: {
    animationDuration: number,
    isLeft: bool.isRequired
  },

  getDefaultProps() {
    return {
      animationDuration: 350
    }
  },

  getInitialState() {
    return {
      knobLeft: 0
    }
  },

  componentWillReceiveProps(nextProps) {
    this.tweenState('knobLeft', {
      duration: this.props.animationDuration,
      endValue: (nextProps.isLeft ? 0 : 400)
    })
  },

  render() {
    const knobStyle = {
      WebkitTransform: `translate3d(${this.getTweeningValue('knobLeft')}px,0,0)`,
      transform: `translate3d(${this.getTweeningValue('knobLeft')}px,0,0)`
    }

    return (
      <div className="toggle-switch" onClick={this.handleClick}>
        <div className="toggle-switch-knob" style={knobStyle} />
      </div>
    )
  }

})

const SpringToggleSwitch = React.createClass({

  propTypes: {
    isLeft: bool.isRequired
  },

  render() {
    return (
      <Spring endValue={{ val: this.props.isLeft ? 0 : 400 }}>
        {({ val }) =>
          <div className="toggle-switch" onClick={this.handleClick}>
            <div className="toggle-switch-knob" style={{
              WebkitTransform: `translate3d(${val}px,0,0)`,
              transform: `translate3d(${val}px,0,0)`
            }} />
          </div>
        }
      </Spring>
    )
  }

})

const App = React.createClass({

  getInitialState() {
    return {
      isLeft: true
    }
  },

  toggle() {
    this.setState({
      isLeft: !this.state.isLeft
    })
  },

  handleClick() {
    this.toggle()
  },

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Toggle</button>
        <ToggleSwitch isLeft={this.state.isLeft} />
        <SpringToggleSwitch isLeft={this.state.isLeft} />
      </div>
    )
  }

})

React.render(<App />, document.getElementById('app'))
