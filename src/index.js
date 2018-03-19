// @flow
import * as React from 'react';
import {Picker as EmojiPicker} from 'emoji-mart';
import Trigger from 'rc-trigger';
import placements from './placements';

import 'emoji-mart/css/emoji-mart.css'

function prevent(e) {
  e.preventDefault();
}

function refFn(field, component) {
  // trigger instance change to children
  (this: any)[field] = component;
}

type Props = {
  emojiSize: number,
  perLine: number,
  skin: number,
  set: string,
  onChange: Function,
  onOpen: Function,
  onClose: Function,
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight',
  children: React.Node,
  prefixCls: string,
  color?: string,
  emoji?: string,
  i18n?: Object,
  sheetSize?: number,
  popupAlign?: Object,
  title?: string,
  style?: {[string]: any},
  getPopupContainer?: Function,
  popupAnimation?: any,
  transitionName?: string,
  disabled?: boolean
}

export default class EmojiMartPicker extends React.Component<Props, {open: boolean}> {
  savePickerPanelRef: ?EmojiMartPicker

  constructor(props: Props) {
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
      (this: any)[e] = (this: any)[e].bind(this);
    });

    (this: any).savePickerPanelRef = refFn.bind(this, 'pickerPanelInstance');
    (this: any).saveTriggerRef = refFn.bind(this, 'triggerInstance');
  }

  static defaultProps = {
    emojiSize: 24,
    perLine: 8,
    skin: 1,
    set: 'apple',
    placement: 'topLeft',
    prefixCls: 'rc-trigger-popup',
    onOpen: (arg: Object) => arg,
    onClose: (arg: Object) => arg,
    children: <span className="emoji-mart-picker-trigger"/>
  };

  onTriggerClick(e: Event) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    });
  }

  onChange(emoji: Object) {
    this.props.onChange(emoji);
    this.setState({
      open: false
    });
  }

  onVisibleChange(open: boolean) {
    this.setOpen(open);
  }

  setOpen(open: boolean, callback?: Function) {
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
    // $FlowFixMe
    return this.triggerInstance;
  }

  getPickerElement() {
    const {color, emoji, emojiSize, skin, style, title,
      perLine, i18n, set, sheetSize} = this.props;
    return (
      <EmojiPicker
        ref={node => this.savePickerPanelRef = node}
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
    );
  }

  open(callback: Function) {
    this.setOpen(true, callback);
  }

  close(callback: Function) {
    this.setOpen(false, callback);
  }

  render() {
    const props = this.props;
    const state = this.state;

    let children = props.children;

    if (children) {
      // $FlowFixMe
      children = React.cloneElement(children, {
        // $FlowFixMe
        ref: node => this.saveTriggerRef = node,
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
