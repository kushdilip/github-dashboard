import Ember from 'ember';

export default Ember.Component.extend({
  chartContent: Ember.computed('content', {
    get(){
      let chartOptions = Ember.$.extend(true, {}, this.get('chartOptions'));
      let content = this.get('content') || [];
      
      return {
        chartData: [{
          name: 'Contribution',
          colorByPoint: true,
          data: content.map(c => {
            return {
              name: c.author.login,
              y: c.total
            };
          })
        }],
        chartOptions: chartOptions
      };
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
  }
});
