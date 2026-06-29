# Timeline photos

Place timeline photos in this folder. JPG, PNG, and WebP files all work.

Then open `src/App.jsx` and update the matching `lifeStops` entry:

```js
{
  year: '2018',
  short: 'BELLEVUE',
  // ...
  image: '/timeline/2018-bellevue.jpg',
}
```

Use `image: null` to show the built-in SVG illustration instead. If an image path is invalid, the SVG illustration is used automatically.

Suggested filenames:

- `2004-tianjin.jpg`
- `2012-folsom.jpg`
- `2014-el-dorado-hills.jpg`
- `2018-bellevue.jpg`
- `2019-newport.jpg`
- `2023-ucsc.jpg`
- `2025-georgia-tech.jpg`
