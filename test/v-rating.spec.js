const Vue = require('vue');
const VRating = require('../src/v-rating.js');

function getComponent(Component, propsData) {
    const Ctor = Vue.extend(Component);
    return new Ctor({ propsData }).$mount();
}

var exampleData = {
    rateMe: 0
};

describe('VRatingSemanticUIComponent', function() {

    it('has correct DOM structure', function() {
        const vm = getComponent(VRating, {
            data: exampleData
        });

        expect(vm.$el.nodeName).toBe('DIV');
    });
});