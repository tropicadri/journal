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
class JournalCamera extends PolymerElement {
  static get template() {
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        padding: 10px;
      }
    </style>

    <div>
      <app-media-devices id="devices" kind="videoinput" selected-device="{{videoDevice}}">
      </app-media-devices>

      <app-media-stream video-device="[[videoDevice]]" stream="{{stream_}}" active\$="[[active]]">
      </app-media-stream>

      <app-media-video id="video" source="[[stream_]]" autoplay="" muted="">
       </app-media-video>

       <app-media-image-capture id="imagecapture" stream="[[computeStreamForCapture_(stream_)]]" last-photo="{{photo}}">
        </app-media-image-capture>
        <paper-button raised="" class="indigo" on-click="takePhoto">Capture Memory</paper-button>

    </div>
`;
  }

  static get is() { return 'journal-camera'; }
  static get properties() {
    return {
       photo: {
        type: Blob,
        notify: true,
       },

       active: {
        type: Boolean,
        observer: 'activeChanged_'
       },

       stream_: {
        type: Object,
        observer: 'streamChanged_'
       },
      }
    }

  takePhoto(){
    this.$.imagecapture.takePhoto();
  }

  activeChanged_(){}

  computeStreamForCapture_(stream) {
    return stream || undefined;
  }

  streamChanged_(newStream, oldStream) {
    if ( newStream == null && !!oldStream ) {
           oldStream.getTracks().forEach((track) => {
             track.stop();
         });
       }
     }
}
window.customElements.define(JournalCamera.is, JournalCamera);
