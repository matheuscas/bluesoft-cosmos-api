"use strict";

// imports
const axios = require('axios');

let conf = {};

// constants
const NO_TOKEN_ERROR = "Nenhum token foi definido.";

// endpoints
const gtinsEndpoint = `/gtins`
const getNcmsProductsEndpoint = (ncm) => `/ncms/{codigo}/products`.replace('{codigo}', ncm);

/**
 * Configura o token da Cosmos API
 * @param {*} token 
 */
function setToken(token) {
    conf['token'] = token;
}

function getConfig(path, params){
    let options = {
        url: path,
        baseURL: 'https://api.cosmos.bluesoft.com.br',
        headers: {'X-Cosmos-Token': conf['token']},
    }

    if (params) {
        options['params'] = params;
    }
    return options;
}

/**
 * Trata de maneira genérica os erros da API
 * @param {*} error 
 */
function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.request)
        return new Promise((resolve, reject) => {
            reject({
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data.message
            });
        });
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return new Promise((resolve, reject) => {
            reject({
                status: undefined,
                statusText: undefined,
                data: error.request
            });
        });
    } else {
        // Something happened in setting up the request that triggered an Error
        return new Promise((resolve, reject) => {
            reject({
                status: undefined,
                statusText: undefined,
                data: error.message
            });
        });
    }
}

function handleSuccess(config){
    return axios
        .request(config)
        .then(response => {
            return new Promise((resolve, reject) => {
                resolve({
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data
                });
            });
        })
        .catch(function(error) {
            return handleError(error);
        });
};

function isTokenUndefined() {
    return conf['token'] === undefined;
}

function handleUndefinedToken() {
    return new Promise((resolve, reject) => {
        reject({
            message: NO_TOKEN_ERROR
        });
    });
}

/**
 * Recupera detalhes do produto atráves do GTIN/EAN informado.
 * @param {*} codigo GTIN/EAN
 */
function gtins(codigo) {
    if (isTokenUndefined()) {
        return handleUndefinedToken();
    } else {
        return handleSuccess(getConfig(`${gtinsEndpoint}/${codigo}`));
    }
}

/**
 * Recupera detalhes do NCM e Produtos vínculados a ele, atráves do código informado.
 * @param {*} ncm 
 */
function ncmsProducts(ncm, page) {
    if (isTokenUndefined()) {
        return handleUndefinedToken();
    } else {
        let params = page ? {'page': page} : undefined;
        return handleSuccess(getConfig(getNcmsProductsEndpoint(ncm), params));
    }
}

module.exports = {
    setToken: setToken,
    gtins: gtins,
    ncmsProducts: ncmsProducts
}

