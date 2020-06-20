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

import '@polymer/iron-image/iron-image.js';
import './shared-styles.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class JournalEntry extends PolymerElement  {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }

      .entry-small{
        width:50px;
        height:50px;
        border-radius:50%;
        margin-right: 10px;
      }

      .entry-big{
        width:100px;
        height:100px;
        margin-right: 10px;
      }

      .card {
        display: flex;
        align-items:center;
      }
    </style>

    <div class="card">
       <iron-image class\$="[[mode]]" src\$="[[entry.url]]" sizing="cover">
       </iron-image>
       [[entry.caption]]
   </div>
`;
  }

  static get is() { return 'journal-entry'; }
  static get properties() {
    return {
      entry: {
        type: Object,
      },
      mode:{
        type:String
      },
      }
    }
}

window.customElements.define(JournalEntry.is, JournalEntry);
