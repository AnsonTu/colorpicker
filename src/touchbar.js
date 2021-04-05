'use strict'
/*This file highlights the objects for the TouchBarButton */

//require electron constant and touchbar
const {TouchBar} = require('electron')
const {TouchBarColorPicker, TouchBarButton} = TouchBar;

//export the dir name and event emiter for touchbar
module.exports = (dirname, eventEmitter) => {
  let colorpicker = new TouchBarColorPicker({
    change: color => eventEmitter.emit('changeColor', color)
  })
  let eyedropper = new TouchBarButton({
    icon: `${dirname}/ressources/eyedropper-touchbar.png`,
    click: () => eventEmitter.emit('launchPicker')
  })
  let colorsbook = new TouchBarButton({
    icon: `${dirname}/ressources/colorsbook-touchbar.png`,
    click: () => eventEmitter.emit('launchColorsbook')
  })
  let settings = new TouchBarButton({
    icon: `${dirname}/ressources/settings-touchbar.png`,
    click: () => eventEmitter.emit('showPreferences')
  })

//set a new object of touchbar to hold all parameters
  let touchbar = new TouchBar([colorpicker, eyedropper, colorsbook, settings])

  let get = () => touchbar

  return touchbar
}
