; (function () {
    // Opiton
    var config = {
        data: '13'
    }

    var _elem;

    

    var totalItem;

    // seleected items.
    var selectItems;


    var alertBody = document.createElement("div");
    var alertContent = document.createElement("div");

    function _init() {
        
        alertBody.className = 'alert-body';


        // head
        var alertHead = document.createElement("div");
        alertHead.className = 'alert-head';
        var alertTitle = document.createElement("span");
        var alertTitleContent = document.createTextNode("Title");
        alertTitle.appendChild(alertTitleContent);
        alertHead.appendChild(alertTitle);


        // content
       
        alertContent.className = 'alert-content';

        // bottom
        var alertBottom = document.createElement("div");
        alertBottom.className = 'alert-bottom';

        // button group
        var alertButtonGroup = document.createElement("div");
        alertButtonGroup.className = 'alert-button-group';

        var cancelButton = document.createElement("button");
        cancelButton.innerText = 'Cancel';
        cancelButton.className += 'btn';
        cancelButton.className += ' cancel-btn';

        cancelButton.addEventListener('click', function (e) {
            close(alertBody);
        });


        var confirmButton = document.createElement("button");
        confirmButton.innerText = 'OK';
        confirmButton.className += 'btn';
        confirmButton.className += ' confirm-btn';

        confirmButton.addEventListener('click', function (e) {
            alert('33');
        });


        alertButtonGroup.appendChild(cancelButton)
        alertButtonGroup.appendChild(confirmButton);
        alertBottom.appendChild(alertButtonGroup);



        // add to alert body
        alertBody.appendChild(alertHead);
        alertBody.appendChild(alertContent);
        alertBody.appendChild(alertBottom);

        document.body.appendChild(alertBody);
    }


    function _setTotalItem() {
        if (typeof totalItem === 'object') {
            totalItem.forEach((item) => {

                var editItem = document.createElement("div");
                editItem.className = 'edit-item';

                var icon = document.createElement("div");
                icon.className = 'select';

                var para = document.createElement("span");
                var node = document.createTextNode(item.name);

                para.appendChild(node);

                editItem.appendChild(icon);
                editItem.appendChild(para);

                alertContent.appendChild(editItem);

            });
        }
    }

    function _setSelection() {
        if (typeof selectItems === 'object') {
            selectItems.forEach(function (item) {
                var para = document.createElement("span");
                var node = document.createTextNode(item.name + ', ');
                para.appendChild(node);
                _elem.appendChild(para);
            });
        }
    }


    function _setStyle(elem) {
        //  elem.style.color = 'red';
    }


    function close(alertBody) {
        document.body.removeChild(alertBody);
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

            _elem = elem;
            _setStyle(elem);

            _elem.addEventListener('click', function (e) {
                _init();
            })
            return this.motal;
        },
        options: function options(ops) {
            totalItem = ops;
            return this.motal;
        },
        setSelect: function (ops) {
            selectItems = ops;
            _setSelection();
            return this.motal;
        },
        setTotalItem: function (ops) {
            totalItem = ops;
            _setTotalItem();
            return this.motal;
        }
    }

    this.motal = api;
})();

