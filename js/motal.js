var motalCheck = function (opts , el) {
    // Opiton
    var config = {
        title: '13',
        totalItems:[],
        selectItems:[]
    }

    var option = Object.assign(config , opts);


    // get first el
    var _elem = el[0];
    _elem.addEventListener('click' , function(){
       open();
    });

    var totalItems = option.totalItems;

    
    // seleected items.
    var selectItems = option.selectItems;
    console.log(selectItems);


    var dialog = {}
    var alertBody = document.createElement("div");
    alertBody.className = 'alert-body';
    var alertHead = document.createElement("div");
    alertHead.className = 'alert-head';
    var alertTitle = document.createElement("span");
    var alertTitleContent = document.createTextNode("Title");


    //content
    var alertContent = document.createElement("div");
    alertContent.className = 'alert-content';


    // bottom
    var alertBottom = document.createElement("div");
    alertBottom.className = 'alert-bottom';

    // button group
    var alertButtonGroup = document.createElement("div");
    alertButtonGroup.className = 'alert-button-group';

    var confirmButton = document.createElement("button");
    confirmButton.innerText = 'OK';
    addClass(confirmButton, 'btn');
    addClass(confirmButton, 'confirm-btn')

    var cancelButton = document.createElement("button");
    cancelButton.innerText = 'Cancel';
    addClass(cancelButton, 'btn');
    addClass(cancelButton, 'cancel-btn');
    cancelButton.addEventListener("click", function(e){
        close();
    })

    // confirm function
    confirmButton.addEventListener('click', function (e) {
        var newSelectItems = [];
        var editItems = document.getElementsByClassName('edit-item');
        for (var i = 0; i < editItems.length; i++) {
            if (editItems[i].getElementsByClassName('select').length) {
                var select = editItems[i].getElementsByClassName('select')[0];
                // id

                var selectedObject = {
                    id: select.id,
                    name: select.nextElementSibling.innerText
                }

                newSelectItems.push(selectedObject);
            }
        }
        selectItems = newSelectItems;
        _setSelection(2);
        close(alertBody);
    });

    // common function
    function hasClass(el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(el.className)
    }

    function addClass(el, className) {
        if (hasClass(el, className)) {
            return
        }
        var newClass = el.className.split(' ')
        newClass.push(className)
        el.className = newClass.join(' ')
    }

    function removeClass(el, className) {
        if (hasClass(el, className)) {
            var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
            el.className = el.className.replace(reg, '');
        }
    }

    // switch class
    function switchClass(el, classNameFirst, classNameSecond) {
        if (hasClass(el, classNameFirst)) {
            removeClass(el, classNameFirst);
            addClass(el, classNameSecond);
        } else if (hasClass(el, classNameSecond)) {
            removeClass(el, classNameSecond)
            addClass(el, classNameFirst);
        }
    }

    // Init
    dialog.init = function () {
        _setSelection();
        _setTotalItem();

        alertTitle.appendChild(alertTitleContent);
        alertHead.appendChild(alertTitle);


        alertButtonGroup.appendChild(cancelButton)
        alertButtonGroup.appendChild(confirmButton);
        alertBottom.appendChild(alertButtonGroup);

        // add to alert body
        alertBody.appendChild(alertHead);
        alertBody.appendChild(alertContent);
        alertBody.appendChild(alertBottom);
    }

    function _setTotalItem() {
        if (typeof totalItems === 'object') {
            totalItems.forEach((item) => {

                var editItem = document.createElement("div");
                editItem.className = 'edit-item';
                // editItem.id = item.id;

                var icon = document.createElement("div");
                addClass(icon, 'select-box');
                addClass(icon, 'unselect');
                icon.addEventListener('click', function (e) {
                    switchClass(this, 'unselect', 'select');
                })

                icon.id = item.id;

                var para = document.createElement("span");
                var node = document.createTextNode(item.name);

                para.appendChild(node);

                editItem.appendChild(icon);
                editItem.appendChild(para);

                alertContent.appendChild(editItem);

            });
        }
    }

    function _setSelection(type = 1) {
        if (typeof selectItems === 'object') {
            if (type === 2) {
                var allSelectedItem = _elem.getElementsByClassName('select-item-name');

                for (var i = allSelectedItem.length - 1; i >= 0; i--) {
                    _elem.removeChild(allSelectedItem.item(i));
                }
            }

            var outputInput = _elem.getElementsByClassName('motal-output-input')[0];
            outputInput.value = '';
            selectItems.forEach(function (item) {
                var para = document.createElement("span");
                addClass(para, 'select-item-name');
                var node = document.createTextNode(item.name + ', ');
                para.appendChild(node);
                _elem.appendChild(para);

                outputInput.value += (item.id + ',')
            });
            str = outputInput.value;
            str = (str.slice(str.length-1) == ',') ? str.slice(0, -1) : str;
            outputInput.value = str;
        }
    }

    function close() {
        document.body.removeChild(alertBody);
    }

    function open() {
        document.body.appendChild(alertBody);
    }

    // Api
    var api = {
        listen: function listen(elem) {
            if (typeof elem === 'string') {
                var elems = document.querySelectorAll(elem);
                var i = elems.length;
                while (i--) {
                    listen(elems[i]);
                }
                return;
            }
            return this.motal;
        }
    }

    dialog.init();
    return dialog;
};

