// Как будто массив данных с бэка
const dataExample = [
    {
        company: 'Alfred <b>Futterkiste</b>',
        chef: 'Maria Anders',
        country: 'Germany',
    },
    {
        company: 'Centro comercial Moctezuma',
        chef: 'Francisco Chang',
        country: 'Mexico',
    },
    {
        company: 'Ernst Handel',
        chef: 'Roland Mendel',
        country: 'Austria',
    },
    {
        company: 'USA Trading',
        chef: 'Helen Bennett',
        country: 'UK',
    },
    {
        company: 'Wayne Inc.',
        chef: 'Bruce Wayne',
        country: 'USA',
    }
];

let gridView = new GridView();
gridView.header = 'Hello';
gridView.headerClass = ['header', 'site'];
gridView.attribute = {
    'company': {
        'label': 'Компания',
        'src': 'html',
    },
    'chef': {
        'label': 'Директор'
    },
    'country': {
        'label': 'Страна',
        'value': (data) => {
            if (data['country'] == 'Germany') {
                return data['country'] + ' map'
            }
            return data['country']
        }
    }
};
gridView.data = dataExample;
gridView.render();

