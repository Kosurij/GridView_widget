class GridView {
    /**
     * properties
     * @param {Array} _tableClass - css классы таблицы.
     * @param {Array} data - входные данные.
     * @param {Array} attribute - управляем, что выводим и как выводим.
     * @param {String} _element - куда выводить таблицу (DOM-элемент).
     * @param {String} _header - заголовок таблицы.
     * @param {Array} _headerClass - css классы заголовка.
     */

    constructor() {
        this._header = '';
        this._headerClass = [];
        this._tableClass = [];
        this._element = 'body';
        this.attribute = [];
    }

    /**
     * Method set header 
     */
    set header(header) {
        if (typeof header === 'string' && header.trim() !== '') {
            this._header = header.trim();
            return true;
        }
        return false
    }

    /**
     * Method set headerClass 
     */
    set headerClass(headerClass) {
        if (typeof headerClass === 'object') {
            this._headerClass = headerClass;
            return true;
        }
        return false
    }

    /**
     * Method set element 
     */
    set element(element) {
        if (document.querySelector(element)) {
            this._element = element;
            return true;
        }
        return false
    }

    /**
     * Method for showing GridViewTable
     */

    render() {
        // show header 
        if (this._header) {
            const header = document.createElement('h1');
            header.textContent = this._header;
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass);
            });
            document.querySelector(this._element).append(header);
        }

        // create table
        const table = document.createElement('table');
        this._tableClass.forEach(cssClass => { // присваиваем класс таблице
            table.classList.add(cssClass);
        });

        // create table header(th)
        let trHeader = document.createElement('tr'); // создаем ряд 
        for (let key in this.attribute) {
            let th = document.createElement('th'); // создаем ячейки (на данный момент 3)
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label
                // если у них есть label, то присваиваем его значение
            }
            else {
                th.textContent = key; // иначе присваиваем имя ключа
            }
            trHeader.append(th); // добавляем в ряд ячейку (на данный момент 3)
        }
        table.append(trHeader); // доблавяем в таблицу ряд.

        // show table
        for (let i = 0; i < this.data.length; i++) {
            let dataArr = this.data[i]; // одна строка данных data
            let tr = document.createElement('tr');
            for (let key in this.attribute) {
                let td = document.createElement('td'); // создаем ячейку
                let value = dataArr[key]; // обращение к значению объекта dataArr

                if (this.attribute[key].value) { // есть ли функция в value;
                    value = this.attribute[key].value(dataArr);
                }

                if (this.attribute[key].src) { // есть ли атрибут src для применеия тегов HTML
                    td.innerHTML = value;
                }
                else {
                    td.textContent = value;
                }
                tr.append(td);
            }
            table.append(tr);
        }

        document.querySelector(this._element).append(table); // добавляем таблицу в DOM. По умолчанию в body.
    }
}