/*global $:true*/

var showContent = (function () {
    var contentbox = $(''
        + '<div class="notepad-editor">'
        + '<textarea spellcheck="false"></textarea>'
        + '</div>');
    var cfg = {
        wrap: false
    };
    var bSelect = false;
    var txtarea = contentbox.find('textarea');

    console.log('显示。。。');

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

    function setWrap(bWrap) {
        if (bWrap) {
            txtarea.attr('wrap', 'soft');
            txtarea.css({ 'overflow-x': 'hidden' });
        } else {
            txtarea.attr('wrap', 'off');
            txtarea.css({ 'overflow-x': 'scroll' });
        }
    }

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

    


    function show(conf) {
        $.extend(cfg, conf);

        $('body').append(contentbox);
        txtarea.trigger('focus');
        setWrap(cfg.wrap);
    }


    txtarea.mousedown(function () { bSelect = true; });

    txtarea.mouseup(function () { bSelect = false; });

    return {
        show: show,
        resize: resize,
        focus: focus,
        setWrap: setWrap,
        setFont: setFont
    };

}());