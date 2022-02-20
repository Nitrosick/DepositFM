// Элементы страницы:
// Кнопки шапки
const currencyButton = document.querySelector('.header_currency_button');
const createButton = document.querySelector('.header_create_button');
const userButton = document.querySelector('.header_user_button');
const accountsButton = document.querySelector('.accounts_open');
const closeAccountsButton = document.querySelector('.accounts_back');

// Выпадающие меню шапки
const currencyMenu = document.querySelector('.header_currency_menu');
const createMenu = document.querySelector('.header_create_menu');
const userMenu = document.querySelector('.header_user_menu');
const accountsMenu = document.querySelector('.header_user_accounts');

// Вкладки основного контента
const mainContentTabs = document.querySelectorAll('.main_content_tab');
const mainContentWindows = document.querySelectorAll('.main_content_tab_window');

// Поля ввода и выбора вариантов
const selects = document.querySelectorAll('.custom_form');
const selectOptionsBlock = document.querySelectorAll('.custom_form_options');
let checkboxesArray = [];

// Массив всех всплывающих окон
const menuArray = [currencyMenu, createMenu, userMenu, accountsMenu];
selectOptionsBlock.forEach(el => {
    menuArray.push(el);
});

// Функции
const closeAll = () => {
    menuArray.forEach(el => {
        el.classList.add('hidden');
    });

    selects.forEach(el => {
        el.classList.remove('custom_form_active');
    });

    document.querySelectorAll('.custom_form .fas').forEach(el => {
        el.style.transform = 'rotate(0)';
    });
};

const menuSwitcher = (element) => {
    if (element.classList.contains('hidden')) {
        closeAll();
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
};

const tabsSwitcher = (element) => {
    mainContentTabs.forEach(el => {
        el.classList.remove('main_content_active_tab');
        const img = el.querySelector('img');
        img.src = img.src.replace('_w.', '_b.');
    });
    element.classList.add('main_content_active_tab');
    const img = element.querySelector('img');
    img.src = img.src.replace('_b.', '_w.');

    mainContentWindows.forEach(el => {
        if (el.dataset.window === element.dataset.tab) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
};

const selectOptions = (element, click) => {
    const optionsBar = element.querySelector('.custom_form_options');
    const arrow = element.querySelector('.fas');

    if (optionsBar.classList.contains('hidden')) {
        closeAll();
        optionsBar.classList.remove('hidden');
        element.classList.add('custom_form_active');
        arrow.style.transform = 'rotate(180deg)';
    } else {
        if (click.tagName === 'OPTION') {
            const value = element.querySelector('.custom_form_value');
            value.style.color = '#333333';
            value.textContent = click.value;
        }

        if (click.className === 'custom_checkbox_layer') {
            addCheckboxOption(element, click);
        } else {
            optionsBar.classList.add('hidden');
            element.classList.remove('custom_form_active');
            arrow.style.transform = 'rotate(0)';
        }
    }
};

const addCheckboxOption = (form, element) => {
    const id = element.dataset.icon;
    const output = form.querySelector('.custom_form_value');

    if (checkboxesArray.includes(id)) {
        for (let i=0; i<checkboxesArray.length; i++) {
            if (checkboxesArray[i] === id) {
                checkboxesArray.splice(i, 1);
            }
        }

        if (checkboxesArray.length) {
            output.innerHTML = '';
            checkboxesOutput(output);
        } else {
            output.textContent = 'На любых условиях';
        }
    } else {
        checkboxesArray.push(id);
        output.innerHTML = '';
        checkboxesOutput(output);
    }
};

const checkboxesOutput = (element) => {
    checkboxesArray.sort();

    checkboxesArray.forEach(el => {
        element.insertAdjacentHTML('beforeEnd', `
            <img src="images/rent_icons/rent_icon_${el}.svg" alt="icon">
        `);
    });
};

// Обработчики событий
document.addEventListener('click', event => {

    const t = event.target;
    const tp = event.target.parentNode;

    if (t === currencyButton || tp === currencyButton) {
        menuSwitcher(currencyMenu);
    } else if (t === createButton || tp === createButton) {
        menuSwitcher(createMenu);
    } else if (t === userButton || tp === userButton) {
        menuSwitcher(userMenu);
    } else if (t === accountsButton) {
        menuSwitcher(accountsMenu);
    } else if (t === closeAccountsButton) {
        menuSwitcher(userMenu);
    }
});

mainContentTabs.forEach(el => {
    el.addEventListener('click', () => {
        tabsSwitcher(el);
    });
});

selects.forEach(el => {
    el.addEventListener('click', event => {
        selectOptions(el, event.target);
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeAll();
    }
});
