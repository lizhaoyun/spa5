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


function comList() {
    var $comList = $('' +
        '<div class="notepad-com-list">' +
        '<input class="editor" type="text"><br>' +
        '<ul class="list">' +
        '</ul>' +
        '</div>');

    var $editor = $comList.find('.editor');
    var $list = $comList.find('.list');
    var $items;

    var cfg = {
        container: '',
        list: [],
        select: 0,
        width: '200px',
        isFont: false,
        isFontStyle: false,
        selectHandler: null
    };

    function setFontStyle(item, style) {
        if (style === '斜体') {
            item.css({ 'font-style': 'italic' });
            return;
        }

        if (style === '粗体') {
            item.css({ 'font-weight': 'bold' });
            return;
        }

        if (style === '粗偏斜体') {
            item.css({ 'font-weight': 'bold', 'font-style': 'italic' });
            return;
        }
    }

    function fillData() {
        var i = 0;
        var $item;

        if (cfg.isFont) {
            for (i = 0; i < cfg.list.length; i++) {
                $item = $('<li class="item"></li>');
                $item.css({ 'font-family': cfg.list[i] });
                $list.append($item.html(cfg.list[i]));
            }
        } else if (cfg.isFontStyle) {
            for (i = 0; i < cfg.list.length; i++) {
                $item = $('<li class="item"></li>');
                setFontStyle($item, cfg.list[i]);
                $list.append($item.html(cfg.list[i]));
            }
        } else {
            for (i = 0; i < cfg.list.length; i++) {
                $item = $('<li class="item"></li>');
                $list.append($item.html(cfg.list[i]));
            }
        }

        $items = $list.find('.item');
    }

    function setSelect(n) {
        $($items[n]).addClass('selected');
        $editor.val(cfg.list[n]);
        $editor.select();
    }

    function init() {
        var oldone = $(cfg.container).find('.notepad-com-list');
        if (oldone.length !== 0) oldone.remove();

        $(cfg.container).append($comList);

        $comList.css({ width: cfg.width });
        fillData();
        setSelect(cfg.select);
    }

    this.show = function (conf) {
        $.extend(cfg, conf);
        init();

        $list.click(function (e) {
            $($items[cfg.select]).removeClass('selected');
            cfg.select = cfg.list.indexOf($(e.target).html());
            $($items[cfg.select]).addClass('selected');
            $editor.val(cfg.list[cfg.select]);
            $editor.select();
            cfg.selectHandler(cfg.select);
        });

        $editor.keyup(function () {
            var i = 0;

            for (i = 0; i < cfg.list.length; i++) {
                if (cfg.list[i].indexOf($editor.val()) === 0) break;
            }

            if (i === cfg.list.length) return;

            $items[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
            $($items[cfg.select]).removeClass('selected');
            $($items[i]).addClass('selected');
            cfg.select = i;
        });
    };
}