(function( win, doc ) {
    'use strict';
  /*
  Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
  o código, conforme vimos na aula anterior. Quebrar as responsabilidades
  em funções, onde cada função faça somente uma única coisa, e faça bem feito.

  - Remova as duplicações de código;
  - agrupe os códigos que estão soltos em funções (declarações de variáveis,
  listeners de eventos, etc);
  - faça refactories para melhorar esse código, mas de forma que o mantenha com a
  mesma funcionalidade.
  */

  function init() {
    initEvents();
  }

  /** Calculator global var buttons */
    var $visor = doc.querySelector( '[data-js="visor"]' );
    const $operations = doc.querySelectorAll( '[data-js="operation-button"]' );
    const $numbers = doc.querySelectorAll( '[data-js="button-number"]' );
    const $clear = doc.querySelector( '[data-js="button-clear"]' );
    const $equal = doc.querySelector( '[data-js="button-equal"]' );
  /***/

  /** Events */
    function initEvents() {
      Array.prototype.forEach.call( $numbers, button => {
        button.addEventListener( 'click', passValueForVisor, false );
      } );
      Array.prototype.forEach.call( $operations, button => {
        button.addEventListener( 'click', addOperator, false );
      } );
      $clear.addEventListener( 'click', clearCalculator, false );
      $equal.addEventListener( 'click', returnResult, false );
    }
  /***/

  /** Functions */
    function passValueForVisor() {
      $visor.value += this.value;
    }

    function addOperator() {
      $visor.value = removeOrChangeOperator( $visor.value );
      $visor.value += this.value;
    }

    function getOperations() {
      return Array.prototype.map.call( $operations, button => {
        return button.value;
      } );
    }

    function isAOperator( item ) {
      let operations = getOperations();
      let lastItem = item.split('').pop();
      return operations.some( operator => {
        return operator === lastItem;
      } );
    }

    function removeOrChangeOperator( item ) {
      if ( isAOperator( item ) ) {
        return item.slice( 0, -1 );
      }
      return item;
    }

    function clearCalculator() {
      $visor.value = null;
    }

    function getRegexValues() {
      return new RegExp( '\\d+[' + getOperations().join('') + ']?', 'g' );
    }

    function returnResult() {
      let allValues = $visor.value.match( getRegexValues() );
      $visor.value = removeOrChangeOperator( $visor.value );
      $visor.value = allValues.reduce( calculateAllValues );
    }

    function calculateAllValues( accumulated, actual ) {
      let firstValue = accumulated.slice( 0, -1 );
      let operator = accumulated.split('').pop();
      let lastValue = removeOrChangeOperator( actual );
      let lastOperator = getLastOperator( actual )
      return calculateOperation( operator, firstValue, lastValue ) + lastOperator;
    }

    function getLastOperator( value ) {
      return isAOperator( value ) ? value.split('').pop() : '';
    }

    function calculateOperation( operator, firstValue, lastValue ) {
      switch( operator ) {
        case '+':
          return Number( firstValue ) + Number( lastValue );
        case '-':
          return Number( firstValue ) - Number( lastValue );
        case 'x':
          return Number( firstValue ) * Number( lastValue );
        case '÷':
          return Number( firstValue ) / Number( lastValue );
      }
    }
  /***/

  init();
})( window, document );

