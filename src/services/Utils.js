import moment from 'moment';

export default class Utils {
  static unixToTime(time) {
    var date = new Date(time*1000);
    var hours = date.getHours();
    var minutes = "0"+date.getMinutes();
    var seconds = "0"+date.getSeconds();

    var formattedTime = hours+":"+minutes.substr(-2)+":"+seconds.substr(-2);

    return formattedTime;
  }

  static unixToDate(time) {
    var newDate = moment(new Date(time * 1000)).format('DD-MM-YYYY');

    return newDate;
  }

  static unixToDay(time){
    var day = moment(new Date(time * 1000)).format('dddd');

    return day;
  }

  static kelvinToFahrenheit(temp) {
    var fahrenheit = (temp - 273.15) * 9/5 + 32;

    return fahrenheit.toFixed(2);
  }

  static kelvinToCelsius(temp) {
    var celsius = temp - 273.15;

    return celsius.toFixed(2);
  }
}
