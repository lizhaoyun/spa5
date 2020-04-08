/*global $:true*/

function fontList() {
    var fonlist = $('' +
        '<div class="notepad-font-list">' +
        '<input class="editetype" type="text"><br>' +
        '<ul class="list">' +
        '</ul>' +
        '</div>');
    var edtype = fonlist.find('.editetype');
    var list = fonlist.find('.list');
    var init = {
        container: '',
        list: [],
        select: 0,
        width: '100px',
        isFont: false,
        isFontStyle: false,
        selectHandler: null
    };
    var $items;

    function setFontStyle(item, style) {
        switch (style) {
            case '斜体':
                item.css({ 'font-style': 'italic' });
                return;
            case '粗体':
                item.css({ 'font-weight': 'bold' });
                return;
            case '粗偏斜体':
                item.css({ 'font-weight': 'bold', 'font-style': 'italic' });
                return;
        }
    }


    function fillData() {
        var i = 0;
        var item;
        if (init.isFont) {
            for (i = 0; i < init.list.length; i++) {
                item = $('<li class="item"></li>');
                item.css('font-family', init.list[i]);
                item.html(init.list[i]);
                list.append(item);
            }
        } else if (init.isFontStyle) {
            for (i = 0; i < init.list.length; i++) {
                item = $('<li class="item"></li>');
                setFontStyle(item, init.list[i]);
                item.html(init.list[i]);
                list.append(item);
            }
        } else {
            for (i = 0; i < init.list.length; i++) {
                item = $('<li class="item"></li>');
                item.html(init.list[i]);
                list.append(item);
            }
        }

        $items = list.find('.item');
    }

    function setSelect(n) {
        $($items[n]).addClass('selected');
        edtype.val(init.list[n]);
        edtype.select();
    }

    function initial() {
        var oldone = $(init.container).find('.notepad-font-list');
        console.log(oldone.length !== 0);
        if (oldone.length !== 0)
            oldone.remove();

        $(init.container).append(fonlist);

        fonlist.css({ width: init.width });
        fillData();
        setSelect(init.select);
    }


    this.show = function (conf) {
        $.extend(init, conf);
        initial();

        list.click(function (e) {
            $($items[init.select]).removeClass('selected');
            init.select = init.list.indexOf($(e.target).html());
            $($items[init.select]).addClass('selected');
            edtype.val(init.list[init.select]);
            edtype.select();
            init.selectHandler(init.select);
        });

        edtype.keyup(function () {
            var i = 0;

            for (i = 0; i < init.list.length; i++) {
                if (init.list[i].indexOf(edtype.val()) === 0) break;
            }

            if (i === init.list.length) return;

            $items[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            $($items[init.select]).removeClass('selected');
            $($items[i]).addClass('selected');
            init.select = i;
        });
    };
}
