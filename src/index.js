/* eslint-disable require-jsdoc */
import React, {Component, PropTypes} from 'react';
import {Picker as EmojiPicker} from '@canner/emoji-mart';
import Trigger from 'rc-trigger';
import placements from './placements';

import './emoji-mart.css';

function prevent(e) {
  e.preventDefault();
}

function refFn(field, component) {
  // trigger instance change to children
  this[field] = component;
}

export default class EmojiMartPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    const events = [
      'onTriggerClick',
      'onChange',
      'getPickerElement',
      'getRootDOMNode',
      'getTriggerDOMNode',
      'onVisibleChange',
      'setOpen',
      'open',
      'close'
    ];

    events.forEach(e => {
      this[e] = this[e].bind(this);
    });

    this.savePickerPanelRef = refFn.bind(this, 'pickerPanelInstance');
    this.saveTriggerRef = refFn.bind(this, 'triggerInstance');
  }

  static defaultProps = {
    emojiSize: 24,
    perLine: 8,
    skin: 1,
    set: 'apple',
    placement: 'topLeft',
    onOpen: arg => arg,
    onClose: arg => arg,
    children: <span className="emoji-mart-picker-trigger"/>
  };

  static propTypes = {
    emojiSize: PropTypes.number,
    perLine: PropTypes.number,
    skin: PropTypes.number,
    set: PropTypes.string,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    color: PropTypes.string,
    emoji: PropTypes.string,
    i18n: PropTypes.object,
    sheetSize: PropTypes.number,
    popupAlign: PropTypes.object,
    title: PropTypes.string,
    style: PropTypes.object,
    placement: PropTypes.oneOf([
      'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
    ]),
    prefixCls: PropTypes.string,
    getPopupContainer: PropTypes.func,
    children: PropTypes.node.isRequired,
    popupAnimation: PropTypes.any,
    transitionName: PropTypes.string,
    disabled: PropTypes.bool
  };

  onTriggerClick(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  onChange(emoji) {
    this.props.onChange(emoji);
    this.setState({
      open: false
    });
  }

  onVisibleChange(open) {
    this.setOpen(open);
  }

  setOpen(open, callback) {
    const {onOpen, onClose} = this.props;
    if (this.state.open !== open) {
      this.setState({
        open: open
      }, callback);
      const event = {
        open: open
      };
      if (open) {
        onOpen(event);
      } else {
        onClose(event);
      }
    }
  }

  getRootDOMNode() {
    return this;
  }

  getTriggerDOMNode() {
    return this.triggerInstance;
  }

  getPickerElement() {
    const {color, emoji, emojiSize, skin, style, title,
      perLine, i18n, set, sheetSize} = this.props;
    return (
      <div style={{zIndex: 10000}}>
        <EmojiPicker
          ref={this.savePickerPanelRef}
          color={color}
          emoji={emoji}
          emojiSize={emojiSize}
          perLine={perLine}
          i18n={i18n}
          set={set}
          sheetSize={sheetSize}
          skin={skin}
          style={style}
          title={title}
          onClick={this.onChange}
        />
      </div>
    );
  }

  open(callback) {
    this.setOpen(true, callback);
  }

  close(callback) {
    this.setOpen(false, callback);
  }

  render() {
    const props = this.props;
    const state = this.state;
    const classes = [props.prefixCls + '-wrap'];
    if (state.open) {
      classes.push(props.prefixCls + '-open');
    }

    let children = props.children;

    if (children) {
      children = React.cloneElement(children, {
        ref: this.saveTriggerRef,
        unselectable: true,
        onClick: this.onTriggerClick,
        onMouseDown: prevent
      });
    }

    const {
      prefixCls,
      placement,
      style,
      getPopupContainer,
      popupAlign,
      popupAnimation,
      disabled,
      transitionName
    } = this.props;

    return (
      <Trigger
        popup={this.getPickerElement()}
        popupAlign={popupAlign}
        builtinPlacements={placements}
        popupPlacement={placement}
        action={disabled ? [] : ['click']}
        destroyPopupOnHide
        getPopupContainer={getPopupContainer}
        popupStyle={style}
        popupAnimation={popupAnimation}
        popupTransitionName={transitionName}
        popupVisible={state.open}
        onPopupVisibleChange={this.onVisibleChange}
        prefixCls={prefixCls}>
        {children}
      </Trigger>
    );
  }
}
