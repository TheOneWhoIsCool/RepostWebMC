// Generated by CoffeeScript 2.5.1
var InventoryBar;

InventoryBar = class InventoryBar {
  constructor(options) {
    this.boxSize = options.boxSize;
    this.div = options.div;
    this.padding = options.padding;
    this.boxes = 9;
    this.activeBox = 1;
    document.querySelector(this.div).style = `position:fixed;bottom:3px;left:50%;width:${(this.boxSize + 2) * this.boxes}px;margin-left:-${this.boxSize * this.boxes / 2}px;height:${this.boxSize}px;`;
  }

  setBox(number, imageSrc) {
    if (imageSrc === null) {
      imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    }
    document.querySelector(`.inv_box_${number}`).src = imageSrc;
  }

  setFocus(number, state) {
    if (state) {
      document.querySelector(`.inv_box_${number}`).style.background = "rgba(0,0,0,0.7)";
      document.querySelector(`.inv_box_${number}`).style.border = "1px solid black";
    } else {
      document.querySelector(`.inv_box_${number}`).style.background = "rgba(54,54,54,0.5)";
      document.querySelector(`.inv_box_${number}`).style.border = "1px solid #363636";
    }
  }

  setFocusOnly(number) {
    var i, j, ref;
    for (i = j = 1, ref = this.boxes; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
      this.setFocus(i, i === number);
    }
    this.activeBox = number;
    return this;
  }

  moveBoxMinus() {
    if (this.activeBox + 1 > this.boxes) {
      this.setFocusOnly(1);
    } else {
      this.setFocusOnly(this.activeBox + 1);
    }
  }

  moveBoxPlus() {
    if (this.activeBox - 1 === 0) {
      return this.setFocusOnly(this.boxes);
    } else {
      return this.setFocusOnly(this.activeBox - 1);
    }
  }

  directBoxChange(event) {
    var code;
    code = event.keyCode;
    if (code >= 49 && code < 49 + this.boxes) {
      return this.setFocusOnly(code - 48);
    }
  }

  setBoxes(images) {
    var i, j, ref;
    for (i = j = 0, ref = images.length - 1; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      this.setBox(i + 1, images[i]);
    }
    return this;
  }

  listen() {
    var _this;
    _this = this;
    $(window).on('wheel', function(event) {
      if (event.originalEvent.deltaY < 0) {
        return _this.moveBoxPlus();
      } else {
        return _this.moveBoxMinus();
      }
    });
    $(document).keydown(function(z) {
      return _this.directBoxChange(z);
    });
    return this;
  }

};

export {
  InventoryBar
};