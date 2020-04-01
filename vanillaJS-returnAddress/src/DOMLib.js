(function( win ) {
  'use strict';
  class DOM {

    constructor( element ) {
      this.element = this.getDOMElements(element);
    }
    getDOMElements( element ) {
      return document.querySelectorAll(element);
    }
    on( event, callback ) {
      Array.prototype.forEach.call( this.element, element => {
        element.addEventListener( event, callback, false );
      });
    }
    off( event, callback ) {
      Array.prototype.forEach.call( this.element, element => {
        element.removeEventListener( event, callback, false );
      });
    }
    get() {
      return this.element;
    }
     forEach() {
      return Array.prototype.forEach.apply( this.element, arguments );
    }
    map() {
      return Array.prototype.map.apply( this.element, arguments );
    }
    filter() {
      return Array.prototype.filter.apply( this.element, arguments );
    }
    reduce() {
      return Array.prototype.reduce.apply( this.element, arguments );
    }
    reduceRight() {
      return Array.prototype.reduceRight.apply( this.element, arguments );
    }
    every() {
      return Array.prototype.every.apply( this.element, arguments );
    }
    some() {
      return Array.prototype.some.aplly( this.element, arguments );
    }
    isArray( param ) {
      return Object.prototype.toString.call( param ) === '[object Array]';
    }
    isObject( param ) {
      return Object.prototype.toString.call( param ) === '[object Object]';
    }
    isFunction( param ) {
      return Object.prototype.toString.call( param ) === '[object Function]';
    }
    isNumber( param ) {
      return Object.prototype.toString.call( param ) === '[object Number]';
    }
    isString( param ) {
      return Object.prototype.toString.call( param ) === '[object String]';
    }
    isBoolean( param ) {
      return Object.prototype.toString.call( param ) === '[object Boolean]';
    }
    isNull( param ) {
      return Object.prototype.toString.call( param ) === '[object Null]' ||
      Object.prototype.toString.call( param ) === '[object Undefined]';
    }
  }

  win.DOM = DOM;
})( window );
