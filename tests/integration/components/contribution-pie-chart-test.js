import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contribution-pie-chart', 'Integration | Component | contribution pie chart', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{contribution-pie-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#contribution-pie-chart}}
      template block text
    {{/contribution-pie-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
