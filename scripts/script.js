// Элементы страницы:
// Кнопки шапки
const currencyButton = document.querySelector('.header_currency_button');
const createButton = document.querySelector('.header_create_button');
const userButton = document.querySelector('.header_user_button');
const accountsButton = document.querySelector('.accounts_open');
const closeAccountsButton = document.querySelector('.accounts_back');
const burgerButton = document.querySelector('.header_burger');
const burgerButtonIcon = burgerButton.querySelector('.fas');

// Выпадающие меню шапки
const currencyMenu = document.querySelector('.header_currency_menu');
const createMenu = document.querySelector('.header_create_menu');
const userMenu = document.querySelector('.header_user_menu');
const userMenuOverlay = document.querySelector('#user_menu_overlay');
const accountsMenu = document.querySelector('.header_user_accounts');
const burgerBar = document.querySelector('#burger_bar');

// Вкладки основного контента
const mainContentTabs = document.querySelectorAll('.main_content_tab');
const mainContentWindows = document.querySelectorAll('.main_content_tab_window');

// Поля ввода и выбора вариантов
const selects = document.querySelectorAll('.custom_form');
const selectOptionsBlock = document.querySelectorAll('.custom_form_options');
const realEstateForm = document.querySelector('#real_estate .custom_form_value');
const roomsForm = document.querySelector('#rooms');
const addressForm = document.querySelector('.real_estate_address');
const parkingPlaces = document.querySelectorAll('.additional_filters_form .select_item');
const additionalFiltersButton = document.querySelector('.more_filters');

const defaultValues = new Map([
    ['rent_select', 'На любых условиях'],
    ['real_estate', 'Жилая недвижимость'],
    ['rooms', 'Комнат'],
  ]);

let checkboxesArray = [];
let rangeArray = [];

// Модальное окно
const modal = document.querySelector('.modal_window');
const modalClose = document.querySelector('.modal_window_close');
const additionalFilters = document.querySelector('.modal_window_additional_filters');
const modalRentMethods = document.querySelector('.modal_window_rent_methods');
const modalErrorReport = document.querySelector('.modal_window_error_report');
const investLinks = document.querySelectorAll('.invest_content_link');
const tiles = document.querySelectorAll('.rent_methods_tile, .opportunities_content_tile');

// Массив всех всплывающих окон
const menuArray = [burgerBar, currencyMenu, createMenu, userMenu, userMenuOverlay, accountsMenu, modal, additionalFilters, modalRentMethods, modalErrorReport];
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
    burgerChangeIcon();
};

const burgerChangeIcon = () => {
    if (burgerBar.classList.contains('hidden')) {
        burgerButtonIcon.className = 'fas fa-bars';
    } else {
        burgerButtonIcon.className = 'fas fa-times';
    }
};

const overlaySwitcher = () => {
    if (!userMenu.classList.contains('hidden') || !accountsMenu.classList.contains('hidden')) {
        userMenuOverlay.classList.remove('hidden');
    } else {
        userMenuOverlay.classList.add('hidden');
    }
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
            checkboxOptions(element, click);
        } else if (click.classList.contains('custom_range_item')) {
            rangeOptions(element, click);
        } else {
            optionsBar.classList.add('hidden');
            element.classList.remove('custom_form_active');
            arrow.style.transform = 'rotate(0)';
        }
    }
};

const checkboxOptions = (form, element) => {
    const id = element.dataset.id;
    const output = form.querySelector('.custom_form_value');
    const checkboxes = form.querySelectorAll('.custom_form_options .custom_checkbox_mark');

    if (checkboxesArray.includes(id)) {
        for (let i=0; i<checkboxesArray.length; i++) {
            if (checkboxesArray[i] === id) {
                checkboxesArray.splice(i, 1);
                checkboxes[id - 1].classList.remove('checked');
                break;
            }
        }

        if (checkboxesArray.length) {
            output.innerHTML = '';
            checkboxesOutput(output);
        } else {
            output.textContent = defaultValues.get(form.id);
        }
    } else {
        checkboxesArray.push(id);
        checkboxes[id - 1].classList.add('checked');
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

const rangeOptions = (form, element) => {
    const id = element.dataset.id;
    const output = form.querySelector('.custom_form_value');
    const range = form.querySelectorAll('.custom_form_options .custom_range_item');

    if (rangeArray.includes(id)) {
        for (let i=0; i<rangeArray.length; i++) {
            if (rangeArray[i] === id) {
                rangeArray.splice(i, 1);
                range[id].classList.remove('selected');
                break;
            }
        }

        if (rangeArray.length) {
            output.innerHTML = '';
            rangeOutput(output);
        } else {
            output.textContent = defaultValues.get(form.id);
            output.style.color = '#7f7f7f';
        }
    } else {
        rangeArray.push(id);
        range[id].classList.add('selected');
        output.innerHTML = '';
        rangeOutput(output);
    }
};

const rangeOutput = (element) => {
    rangeArray.sort();
    element.style.color = '#333333';

    if (rangeArray.length === 1) {
        if (rangeArray[0] === '0') {
            element.innerHTML = 'Студия';
        } else {
            element.innerHTML = rangeArray[0] + ' комн.';
        }
    } else {
        if (rangeArray.includes('0')) {
            element.innerHTML = 'Студия, ';
            if (rangeArray.length === 2) {
                element.insertAdjacentHTML('beforeEnd', rangeArray[1] + ' комн.');
            } else {
                const min = rangeArray[1];
                const max = rangeArray[rangeArray.length - 1];
                element.insertAdjacentHTML('beforeEnd', min + '-' + max + ' комн.');
            }
        } else {
            const min = rangeArray[0];
            const max = rangeArray[rangeArray.length - 1];
            element.innerHTML = min + '-' + max + ' комн.';
        }
    }
};

const changeParkingPlaces = (element) => {
    parkingPlaces.forEach(el => {
        el.classList.remove('selected');
    });
    element.classList.add('selected');
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
    } else if (t === burgerButton || tp === burgerButton) {
        menuSwitcher(burgerBar);
    } else if (t === burgerBar) {
        burgerBar.classList.add('hidden');
    } else if (t === additionalFiltersButton || tp === additionalFiltersButton) {
        closeAll();
        modal.classList.remove('hidden');
        additionalFilters.classList.remove('hidden');
    } else if (t === accountsButton) {
        menuSwitcher(accountsMenu);
    } else if (t === closeAccountsButton) {
        menuSwitcher(userMenu);
    } else if (t === modal || tp === modalClose) {
        modal.classList.add('hidden');
    } else if (t.classList.contains('select_item')) {
        changeParkingPlaces(t);
    }

    overlaySwitcher();
    burgerChangeIcon();

    if (realEstateForm.textContent === 'Коммерческая недвижимость' || realEstateForm.textContent === 'Прочая') {
        roomsForm.classList.add('hidden');
        addressForm.style.gridColumnStart = 2;
    } else {
        roomsForm.classList.remove('hidden');
        addressForm.style.gridColumnStart = 3;
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

investLinks.forEach(el => {
    el.addEventListener('click', () => {
        closeAll();
        modal.classList.remove('hidden');
        modalErrorReport.classList.remove('hidden');
    });
});

tiles.forEach(el => {
    el.addEventListener('click', () => {
        closeAll();
        modal.classList.remove('hidden');
        modalRentMethods.classList.remove('hidden');
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        closeAll();
    }
});
