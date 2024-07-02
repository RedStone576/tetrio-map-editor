# Map Editor for TETR.IO

Originally made for tetrio-minus, extracted and rewritten for better usage. should be identical with some exception.

## Site

https://redstone576.github.io/tetrio-map-editor/

![image](https://github.com/RedStone576/Tetrio-Map-Collection/assets/44940224/fcfd8adb-693c-4688-a64d-6386378d35e7)

## Usage
Since custom map is still experimental, the option to input the map string is hidden.  
a text field could be inserted into the custom game option tab and the game would load the provided map string.

[tetrio-minus](https://github.com/RedStone576/tetrio-minus) and [TETR.IO PLUS](https://gitlab.com/UniQMG/tetrio-plus) have a feature that would insert the text field and their own respective map editor, but you could also run this snippet in your browser console to add the text field:

```js
document.querySelectorAll('[title="Text displayed before starting game."]')[0].outerHTML = `<div class="room_config_row flex-row imp" title="Text displayed before starting game."><div class="room_config_label flex-item ns">mission</div><input class="room_config_item flex-item" data-index="mission" value="CUSTOM GAME"></div><div class="room_config_row flex-row imp" title="custom map"><div class="room_config_label flex-item ns">map</div><input class="room_config_item flex-item" data-index="map" value=""></div>`
```

## Extension
still cooking

## TODO
- [ ] extension
- [ ] map gallery

## Links

- [TETR.IO community dev Discord guild](https://discord.gg/qgrw5J7q8k) (unofficial)
- [Personal Discord guild](https://discord.gg/C2qHe7F)
