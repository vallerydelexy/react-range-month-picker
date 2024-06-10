# React Range Month Picker

![https://img.shields.io/npm/dw/react-lite-month-picker](https://img.shields.io/npm/dw/react-lite-month-picker) ![npm](https://img.shields.io/npm/v/react-lite-month-picker) ![GitHub top language](https://img.shields.io/github/languages/top/henripar/react-lite-month-picker) ![GitHub](https://img.shields.io/github/license/henripar/react-lite-month-picker)

Simple, modern and customizable month picker component for ReactJS.

![React Range Month Picker](https://www.react-lite-month-picker.dev/header-cover.png)

## Features

&#128512; **Simple and easy to use.**  
&#127798; **Tiny**: Minzipped size less than 1kB.  
&#129473; **Highly customizable**: Easily make it fit to your designs.  
&#128197; **Accessible**: Fully accessible with keyboard navigation. Developed according the WCAG 2.1 accesibility guidelines.  
🇫🇮 **41 languages** supported.  
&#128683; **0 Dependencies**: No surprise dependencies included.

## Installation

**Using npm:**

```bash
npm install react-range-month-picker --save
```

**Using yarn:**

```bash
yarn add react-range-month-picker
```

**Using bun:**

```bash
bun install react-range-month-picker
```

## Usage

```jsx
import { useState } from "react";
import { MonthRangePicker } from "react-range-month-picker";

function Example() {
  const initialDate = new Date();
  const [date, setDate] = useState({
    from: new Date(initialDate.getFullYear(), initialDate.getMonth, 1),
    to: new Date(initialDate.getFullYear(), initialDate.getMonth, 0),
  });
  const selectedMonthData = {
    fromMonth: new Date(date.from).getMonth(),
    fromYear: new Date(date.from).getFullYear(),
    toMonth: new Date(date.to).getMonth(),
    toYear: new Date(date.to).getFullYear(),
  };
  const setSelectedMonthData = (data) => {
    setDate({
      from: new Date(data.fromYear, data.fromMonth, 1),
      to: new Date(data.toYear, data.toMonth, 0),
    });
  };

  return (
    <MonthRangePicker
      size="small"
      selected={selectedMonthData}
      onChange={setSelectedMonthData}
    />
  );
}

export default Example;
```

### Selected month data

Currently selected month data is an object with the following structure:

```js
{
  month: 9,
  year: 2023,
  monthName: 'September',
  monthShort: 'Sep'
}
```

It will get saved on set parent component state with `onChange` event.

## Customization

You can customize the `MonthPicker` component styles by passing props to it.

| Prop name            | Description                                        | Default value |
| -------------------- | -------------------------------------------------- | ------------- |
| `bgColorMonthActive` | Background color of the active month.              | `#4ea3983e`   |
| `bgColorMonthHover`  | Background color of the month on mouse hover.      | `#f4f4f4`     |
| `borderRadiusMonth`  | Border radius of the moth element.                 | `7px`         |
| `bgColorPicker `     | Background color of the picker element.            | `#fff`        |
| `textColor`          | Color of the text.                                 | `#000`        |
| `size`               | Size of the component. Accepts 'small' or 'large'. | `large`       |
| `lang`               | Language. Accepts ISO 639-1 language code.         | `en`          |

\
\
You can customize the `MonthInput` component styles by passing props to it.

| Prop name      | Description                                           | Default value |
| -------------- | ----------------------------------------------------- | ------------- |
| `bgColor`      | Background color of the input element.                | `#fff`        |
| `bgColorHover` | Background color of the input element on mouse hover. | `#fff`        |
| `textColor`    | Color of the text.                                    | `#000`        |
| `size`         | Size of the component. Accepts 'small' or 'large'.    | `large`       |
| `lang`         | Language. Accepts ISO 639-1 language code.            | `en`          |

See full list of supported languages on the [website](https://www.react-lite-month-picker.dev/).

## License

MIT © [rizkiaprita](https://aprita.web.id)
