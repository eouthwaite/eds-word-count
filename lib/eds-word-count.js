'use babel';

import EdsWordCountView from './eds-word-count-view';
import { CompositeDisposable } from 'atom';

export default {

  edsWordCountView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.edsWordCountView = new EdsWordCountView(state.edsWordCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.edsWordCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'eds-word-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.edsWordCountView.destroy();
  },

  serialize() {
    return {
      edsWordCountViewState: this.edsWordCountView.serialize()
    };
  },

  toggle() {
    console.log('EdsWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
