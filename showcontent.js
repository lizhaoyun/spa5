/*global $:true*/

var showContent = (function () {
    var contentbox = $(''
        + '<div class="notepad-editor">'
        + '<textarea spellcheck="false"></textarea>'
        + '</div>');

    var txtarea = contentbox.find('textarea');

    var cfg = {
        wrap: false
    };
    var bSelect = false;
    console.log('显示。。。');

    function resize(isBig) {
        if (isBig) {
            contentbox.css({ bottom: '21px' });
        } else {
            contentbox.css({ bottom: '0' });
        }
    }
    function focus() {
        txtarea.focus();
    }

    txtarea.mousedown(function () { bSelect = true; });

    txtarea.mouseup(function () { bSelect = false; });



    function setWrap(bWrap) {
        if (bWrap) {
            txtarea.attr('wrap', 'soft');
            txtarea.css({ 'overflow-x': 'hidden' });
        } else {
            txtarea.attr('wrap', 'off');
            txtarea.css({ 'overflow-x': 'scroll' });
        }
    }

    function setFont(e) {
        txtarea.css({ 'font-family': e.family, 'font-size': e.size + 'pt' });

        if (e.style === '斜体') {
            txtarea.css({ 'font-style': 'italic' });
            return;
        }

        if (e.style === '粗体') {
            txtarea.css({ 'font-weight': 'bold' });
            return;
        }

        if (e.style === '粗偏斜体') {
            txtarea.css({ 'font-weight': 'bold', 'font-style': 'italic' });
            return;
        }
    }


    function show(conf) {
        $.extend(cfg, conf);

        $('body').append(contentbox);
        txtarea.trigger('focus');
        setWrap(cfg.wrap);
    }

    // function show() {
    //   $('body').append(contentbox);
    //   txtarea.trigger('focus');
    // }

    // return {show: show, resize: resize};
    return {
        show: show,
        resize: resize,
        focus: focus,
        // getTotalLn: getTotalLn,
        // getRow: getRow,
        // getCol: getCol,
        setWrap: setWrap,
        setFont: setFont
    };

}());