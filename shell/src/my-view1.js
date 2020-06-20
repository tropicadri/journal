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
import './contact-item.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MyView1 extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;

        padding: 10px;
      }
    </style>
`;
  }

  static get is() { return 'my-view1'; }




  add(){		  
    
  }

  goToPhoto(e){
		
  }

  activeChanged_(){
    //console.log("active changed in view 1");
  }
}

window.customElements.define(MyView1.is, MyView1);
