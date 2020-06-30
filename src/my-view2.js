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

import "@polymer/paper-button/paper-button.js";
import "./shared-styles.js";
import "./journal-camera.js";
import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { GestureEventListeners } from "@polymer/polymer/lib/mixins/gesture-event-listeners.js";
class MyView2 extends GestureEventListeners(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
      </style>
      <template is="dom-if" if="[[cameraVisible]]">
        <journal-camera photo="{{photo}}" active$="[[active]]"></journal-camera>
      </template>
      <template is="dom-if" if="[[!cameraVisible]]">
        <journal-entry mode="entry-big" entry$="[[entry]]" on-tap="goToList">
        </journal-entry>
      </template>
    `;
  }

  static get is() {
    return "my-view2";
  }

  static get properties() {
    return {
      photo: {
        type: Blob,
        observer: "photoChanged_",
      },

      entry: {
        type: Object,
        notify: true,
      },

      active: {
        type: Boolean,
        observer: "activeChanged_",
      },

      items: {
        type: Array,
        value: [],
        notify: true,
      },

      cameraVisible: {
        type: Boolean,
        computed: "computeCameraVisible(entry)",
      },
    };
  }

  photoChanged_() {
    window.URL = window.URL || window.webkitURL;
    const index = this.items.indexOf(this.entry);
    if (index >= 0) {
      const path = "items." + index + ".url";
      const url = window.URL.createObjectURL(this.photo);
      this.entry.url = url;
      this.notifyPath(path, url);
    }
    this.set("entry", null);
    window.history.pushState({}, null, "view1");
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  computeCameraVisible(entry) {
    return this.entry == null || this.entry.url == undefined;
  }

  goToList(e) {
    this.set("entry", null);
    window.history.pushState({}, null, "view1");
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  activeChanged_(oldActive, newActive) {}
}

window.customElements.define(MyView2.is, MyView2);
