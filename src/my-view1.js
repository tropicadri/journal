/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement } from '@polymer/polymer/polymer-element.js';

import '@polymer/iron-list/iron-list.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import './journal-entry.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
class MyView1 extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        padding: 10px;
      }
    </style>

    <paper-button raised="" class="indigo" on-click="add">add</paper-button>
    <paper-input value="{{newCaption}}"></paper-input>
    <iron-list id="list" items="[[items]]" as="item" selection-enabled="" multi-selection="">
      <template>
        <div>
          <journal-entry mode="entry-small" entry\$="[[item]]" on-tap="goToPhoto">
          </journal-entry>
        </div>
      </template>
    </iron-list>
`;
  }

  static get is() { return 'my-view1'; }
  static get properties() {
    return {
      items: {
        type: Array,
        notify: true,
        value: [],
      },
      newCaption:{
        type:String,
        value: ""
      },
      entry: {
        type: Object,
        value: {},
        notify: true,
      },
      active: {
        type: Boolean,
        observer: 'activeChanged_'
      },
      captions: {
        type:Array,
        value:[],
        notify:true,
      },
    };
  }

  add(){
   if(this.newCaption.length > 0){
     const index = this.captions.indexOf(this.newCaption);
     if (index == -1 && this.newCaption != 'Dogs') {
       this.push('captions',this.newCaption);
       this.push('items', {caption: this.newCaption} );
       this.$.list.notifyResize();
     }
     this.set('newCaption', "");
   }
  }

  goToPhoto(e){
    this.set('entry',this.get(['items',e.model.index]));
    window.history.pushState({}, null, 'view2');
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  activeChanged_(){}
}
window.customElements.define(MyView1.is, MyView1);
