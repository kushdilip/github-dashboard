import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  repos: Ember.computed.alias('controllers.application.repos'),
  
  chartContent: Ember.computed('contributions', {
    get(){
      let chartOptions = Ember.$.extend(true, {}, this.get('chartOptions'));
      let contributions = this.get('contributions') || [];
      
      return contributions.map(contrib => {
        contrib = contrib || [];
        return {
          chartData: [{
            name: 'Contribution',
            colorByPoint: true,
            data: contrib.map(c => {
              return {
                name: c.author.login,
                y: c.total
              };
            })
          }],
          chartOptions: chartOptions
        };
      });
    }
    
  }),
  
  chartOptions: {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                  style: {
                      color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                  }
              }
          }
      },
    yAxis: {
      title: {
          text: ''
      }
    }
  },
  
  actions: {
    showGroupModal(){
      this.set('isGroupModal', true);
    },
    hideGroupModal(){
      this.set('isGroupModal', false);
    }
  }
});