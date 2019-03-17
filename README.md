# V-Rating :zap: [![Build Status](https://travis-ci.org/vinayakkulkarni/v-rating.svg?branch=master)](https://travis-ci.org/vinayakkulkarni/v-rating) <a href="https://github.com/vinayakkulkarni/v-rating/releases/latest"><img src="https://img.shields.io/github/release/vinayakkulkarni/v-rating.svg" alt="github release"></a> <a href="http://npmjs.org/package/v-rating"><img src="https://img.shields.io/npm/v/v-rating.svg" alt="npm version"></a> <a href="http://npm-stat.com/charts.html?package=v-rating"><img src="https://img.shields.io/npm/dm/v-rating.svg" alt="npm downloads"></a>

+ Simple `ui rating` component for Vue made with Semantic-UI.

+ This is [on GitHub](https://github.com/vinayakkulkarni/v-rating)  so let me know if I've b0rked it somewhere, give me a star :star: if you like it :beers:

+ Demo here -> [💯 Codesandbox Link](http://bit.ly/v-rating)
## Requirements

* [Vue.js](https://vuejs.org/) 2.x
* [Semantic-UI](https://semantic-ui.com/) 2.x

## :white_check_mark: Install :ok_hand:

```bash
npm install v-rating
// or
yarn add v-rating
```

CDN: [UNPKG](https://unpkg.com/v-rating/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-rating/dist/) (available as `window.VRating`)

## :white_check_mark: Usage :mortar_board:

Register the component globally:
```javascript
Vue.component('Rating', require('v-rating'));
```
Or use locally
```javascript
import Rating from 'v-rating';
```

## :white_check_mark: Example 1 :four_leaf_clover:

```html
<rating v-model="yourLocalVariable" class="huge heart"></rating>
```

```javascript
Vue.component('example-component', {
	data() {
		return {
			yourLocalVariable: 0,
		};
	}
});
```

### :white_check_mark: :book: Props

| Name | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `type` | String | No | `star` | The type of rating component will it be? SUI has `stars` &`heart`. |
| `clearable` | Boolean | No | `true` | Whether the rating is clearable or not. [Read the SUI Docs on this](https://semantic-ui.com/modules/rating.html#/settings) |
| `max` | String | No | `5` | A number representing the maximum ratings that can be made available. |
| `initial` | String | No | `0` | A number representing the default rating to apply. |

## NPM :octocat:  

[![NPM](https://nodei.co/npm/v-rating.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/v-rating/)