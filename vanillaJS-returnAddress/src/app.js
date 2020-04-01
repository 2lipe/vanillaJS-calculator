(function( DOM ) {
    'use strict';

    function app() {
        const ajax = new XMLHttpRequest();

        const $formCep = new DOM( '[data-js="form-search"]' );
        const $inputCep = new DOM( '[data-js="getInput"]' );
        var $status = new DOM( '[data-js="status"]' );
        let $cep = new DOM ( '[data-js="cep"]' );
        let $logradouro = new DOM( '[data-js="logradouro"]' );
        let $bairro = new DOM( '[data-js="bairro"]' );
        let $cidade = new DOM( '[data-js="cidade"]' );
        let $estado = new DOM( '[data-js="estado"]' );
        
        $formCep.on( 'submit', getAddress, false );

        function getAddress( e ) {
            e.preventDefault();
            let url = getUrl();

            ajax.open( 'GET', url );
            ajax.send();
            getMessage( 'loading' );
            ajax.addEventListener( 'readystatechange', handleReadyStateChange, false );
        }

        function getUrl() {
            return replaceCep( 'https://viacep.com.br/ws/[CEP]/json/' );
        }

        function replaceCep( textForReplace ) {
            return textForReplace.replace( '[CEP]', clearCep() );
        }

        function clearCep() {
            return $inputCep.get()[0].value.replace( /\D/g, '' );
        }

        function handleReadyStateChange() {
            if( isRequestOk() ) {
                fillCepFields();
                getMessage( 'ok' );
            }
        }

        function isRequestOk() {
            return ajax.readyState === 4 && ajax.status === 200;
        }

        function fillCepFields() {
            let data = parseData();
            if( !data ) {
                getMessage( 'error' );
                data = clearData();
            }

            $cep.get()[0].value = data.cep;
            $logradouro.get()[0].value = data.logradouro;
            $bairro.get()[0].value = data.bairro;
            $cidade.get()[0].value = data.localidade;
            $estado.get()[0].value = data.uf;
        }

        function parseData() {
            let result;

            try {
                result = JSON.parse( ajax.responseText );
            }
            catch( err ) {
                result = null;
            }
            return result;
        }

        function clearData() {
            return {
                cep : '-',
                logradouro : '-',
                bairro : '-',
                localidade : '-',
                uf : '-'
            }
        }

        function getMessage( type ) {
            let messages = {
                loading : replaceCep( 'Buscando informações para o CEP [CEP]' ),
                ok : replaceCep( 'Endereço referente ao CEP [CEP]' ),
                error : replaceCep( 'Não encontramos o endereço para o CEP [CEP]' ),
            };
            $status.get()[0].value = messages[type];
        }
    }
    app();

})( window.DOM );