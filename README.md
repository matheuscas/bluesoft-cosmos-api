# Um pacote npm para facilitar o acesso à API da Bluesoft Cosmos

## Como instalar

```
npm install bluesoft-cosmos-api --save
```

## Como usar

```javascript
const cosmos = require('bluesoft-cosmos-api');

// Consiga seu Token em: https://cosmos.bluesoft.com.br
cosmos.setToken('SEU_TOKEN');

// Consiga resultados para o produto pelo GTIN/EAN13
cosmos.gtins('7891910000197').then(res => {
    console.log('Result: ',res);
}).catch(err => {
    console.log('Error: ',err);
});

```

Retorno:

```javascript
SUCESS:  { 
    status: 200,
    statusText: 'OK',
    data:
    { 
        description: 'AÇÚCAR REFINADO UNIÃO 1KG',
        gtin: 7891910000197,
        thumbnail: 'https://cdn-cosmos.bluesoft.com.br/products/7891910000197',
        price: 'R$ 2,99',
        avg_price: 2.99,
        max_price: 2.99,
        min_price: 2.99,
        width: null,
        height: null,
        length: null,
        net_weight: 1000,
        gross_weight: 1000,
        barcode_image: 'http://api.cosmos.bluesoft.com.br/products/barcode/C5A6D9FADB6D01B6E5B321FAB9053F92.png',
        brand: { name: 'UNIAO', picture: '' },
        gpc:{ 
            code: '10000043',
            description: 'Açúcar / Substitutos do Açúcar (Não perecível)' 
        },
        ncm:{ 
            code: '17019900',
            description: 'Outros',
            full_description: 'Açúcares e produtos de confeitaria - Açúcares de cana ou de beterraba e sacarose quimicamente pura, no estado sólido - Outros: - Outros' 
        },
        cest:{ 
            id: 2154,
            code: '1710300',
            description: 'Outros tipos de açúcar, em embalagens de conteúdo inferior ou igual a 2 kg, exceto as embalagens contendo envelopes individualizados (sachês) de conteúdo inferior ou igual a 10 g',
            parent_id: 1671 
        },
        gtins: [
            {"gtin":7891910000197,"commercial_unit":{"type_packaging":"Unidade","quantity_packaging":1,"ballast":null,"layer":null}},
            {"gtin":7891910000203,"commercial_unit":{"type_packaging":"Fardo","quantity_packaging":10,"ballast":null,"layer":null}}
        ] 
    } 
}
```

Mais funções da API:

```javascript
/* Recupera detalhes do NCM e Produtos vínculados a ele, atráves do código informado.
 * @param {*} ncm 
 * @param {*} page 
 */
function ncmsProducts(ncm[, page])

Ex.:

// Passando uma página
cosmos.ncmsProducts('18063110', 2).then(res => {
    console.log('SUCESS: ',res);
}).catch(err => {
    console.log('catch: ',err);
});

cosmos.ncmsProducts('18063110').then(res => {
    console.log('SUCESS: ',res);
}).catch(err => {
    console.log('catch: ',err);
});

```
Disclaimer: eu não sou funcionário da Bluesoft ou não estou ganhando nada para fazer esse pacote. O 
ganho, pessoal, é duplo: aprender a criar e publicar um pacote npm e usar a API da Bluesoft em outro projeto pessoal. 
