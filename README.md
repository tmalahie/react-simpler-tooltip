# react-simpler-tooltip
Lightweight and easy-to-use react component to display a tooltip over a given element when passing mouse on it

This module is very similar to [react-simple-tooltip](https://github.com/xuopled/react-simple-tooltip), but fixes some minor problems with the package:
* Tooltip never overflows outside the screen, its edges are capped if content is too long
* No word-break by default, which is a a more natural behaviour in my opinion
* Add `auto` placement option, which allows to not worry about where to draw the tooltip
* Tooltip is rendered in the document body instead of just outside the `<div>` (See [issue](https://github.com/xuopled/react-simple-tooltip/issues/13))

## Install:
```bash
npm install react-simpler-tooltip
```

## Usage:
```jsx
import Tooltip from 'react-simpler-tooltip'

// ...
render() {
  return <Tooltip content="I love what you do">
    <button>Hey man</button>
  </Tooltip>
}
```

### Result:

![I love what you do](https://timothe.malahieude.net/projects/react-simpler-tooltip/demo.png?)

## Specify placement:
`<Tooltip content="xxx" placement="top">xxx</Tooltip>`

The `placement` attribute accepts 5 values: `left`, `top`, `right`, `bottom`, and `auto`. **auto** is the default value, it means that the tooltip will be placed automatically in function of where the hovering element is (e.g if the item is at the right of the window, the tooltip will be placed at the left).

## Custom style/className for tooltip:
You can assign custom style or class to the tooltip with the attributes `tooltipStyle` and `tooltipClass`:

`<Tooltip content="xxx" tooltipStyle={{padding:0}} tooltipClass="tooltip-menu">xxx</Tooltip>`

## Contribute
Feel free to contribute for this project. Issues and pull requests are welcomed.

## License
This project is licensed under the MIT License - see the [License](https://github.com/tmalahie/react-simpler-tooltip/blob/master/LICENSE) file for details
