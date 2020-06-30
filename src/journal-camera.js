/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import "@polymer/iron-image/iron-image.js";
import "./shared-styles.js";
import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import "@polymer/app-media/app-media-devices.js";
import "@polymer/app-media/app-media-stream.js";
import "@polymer/app-media/app-media-image-capture.js";
import "@polymer/app-media/app-media-video.js";

class JournalCamera extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: flex;
          flex-direction: column;
          padding: 10px;
        }

        .button {
          width: 100%;
        }
      </style>

      <div>
        <app-media-devices kind="videoinput" devices="{{camera}}">
        </app-media-devices>

        <app-media-stream
          id="vidstream"
          video-device="[[camera]]"
          stream="{{stream_}}"
        >
        </app-media-stream>

        <app-media-video
          contain
          source="[[stream_]]"
          autoplay="[[active]]"
          muted
        >
        </app-media-video>

        <app-media-image-capture
          id="imagecapture"
          stream="[[stream_]]"
          focus-mode="single-shot"
          red-eye-reduction
          last-photo="{{photo}}"
        >
        </app-media-image-capture>
        <paper-button
          class="button"
          raised=""
          class="indigo"
          on-click="takePhoto"
          >Capture Memory</paper-button
        >
      </div>
    `;
  }

  static get is() {
    return "journal-camera";
  }
  static get properties() {
    return {
      photo: {
        type: Blob,
        notify: true,
      },

      active: {
        type: Boolean,
        observer: "activeChanged_",
      },
      stream_: {
        type: Object,
      },
    };
  }

  takePhoto() {
    this.$.imagecapture.takePhoto();
  }

  activeChanged_(newActive, oldActive) {
    if (newActive) {
      this.$.vidstream.active = true;
    } else {
      if (this.stream_) {
        this.stream_.getTracks().forEach((track) => {
          track.stop();
        });
      }

      this.$.vidstream.active = false;
    }
  }
}
window.customElements.define(JournalCamera.is, JournalCamera);
