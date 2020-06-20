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

import '@polymer/app-media/app-media-image-capture.js';
import '@polymer/app-media/app-media-devices.js';
import '@polymer/app-media/app-media-stream.js';
import '@polymer/app-media/app-media-video.js';
import '@polymer/paper-button/paper-button.js';
import './contact-camera.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
class MyView2 extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
      }
    </style>
`;
  }

  static get is() { return 'my-view2'; }



  photoChanged_() {
         
  }

  activeChanged_(){
	}
}



window.customElements.define(MyView2.is, MyView2);
