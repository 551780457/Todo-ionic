angular.module('zy.config', [])
    .constant('DB_CONFIG', {
        name: 'zyfc.db',
        version: '1.0',
        tables: [
            {
                name: 'users',
                columns: [
                    {name: 'uid', type: 'Long primary key'},
                    {name: 'uName', type: 'text'},
                    {name: 'password', type: 'text'},
                    {name: 'token', type: 'text'},
                    {name: 'login_date', type: 'Long'},
                ]
            }
        ]
    });