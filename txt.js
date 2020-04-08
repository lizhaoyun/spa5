/*global $:true*/
/*global fontList:true*/
/* exported $dlgFont */
/*eslint no-console: ["error", { allow: ["log"] }]*/
var $dlgFont = (function() {
    var fontlg = $('' +
        '<div class="notepad-dlg-mask notepad-dlg-font">' +
        '<div class="dialogbox notepad-dlgbox">' +
        '<div class="notepad-dlg-titlebar">' +
        '<p class="title">字体</p>' +
        '<span class="close-btn">✖</span>' +
        '</div>' +
        '<div class="main notepad-dlg-main">' +
        '<div class="font-family"><p>字体(F):</p></div>' +
        '<div class="font-style"><p>字形(Y):</p></div>' +
        '<div class="font-size"><p>大小(S):</p></div>' +
        '<fieldset class="sample">' +
        '<legend>示例</legend>' +
        '<p class="sample-txt">AaBbYyZz</p>' +
        '</fieldset>' +
        '<div class="script">' +
        '<label>' +
        '脚本(R):<br>' +
        '<select>' +
        '<option value="西欧语言">西欧语言</option>' +
        '<option value="中文 GB2312">中文 GB2312</option>' +
        '</select>' +
        '</label>' +
        '</div>' +
        '<input class="btn-ok btn" type="button" value="确定">' +
        '<input class="btn-cancel btn" type="button" value="取消">' +
        '</div>' +
        '</div>' +
        '</div>');

    var cfg = {
        family: 'Arial',
        style: '常规',
        size: '16',
        okHandler: null
    };
    var btnOk = fontlg.find('.btn-ok'),
            btnClose = fontlg.find('.close-btn'),
            btnCancel = fontlg.find('.btn-cancel'),
            exampletxt = fontlg.find('.sample-txt'),
            titleBar = fontlg.find('.notepad-dlg-titlebar');

    function sample() {
        exampletxt.css({ 'font-family': cfg.family, 'font-size': cfg.size + 'pt' });

        if(cfg.style === '常规') {
            exampletxt.css({'font-style': 'normal'});
            return;
        }

        if (cfg.style === '斜体') {
            exampletxt.css({ 'font-style': 'italic' });
            return;
        }

        if (cfg.style === '粗体') {
            exampletxt.css({ 'font-weight': 'bold' });
            return;
        }

        if (cfg.style === '粗偏斜体') {
            exampletxt.css({ 'font-weight': 'bold', 'font-style': 'italic' });
            return;
        }
    }

    function destory() { fontlg.remove(); }

    function show(conf) {
        $.extend(cfg, conf);

        $('body').append(fontlg);
        init();
        fontlg.find('.dialogbox').draggable({ handle: titleBar });

        btnClose.click(destory);
        btnCancel.click(destory);
        btnOk.click(function() {
            cfg.okHandler({
                family: cfg.family,
                style: cfg.style,
                size: cfg.size
            });

            destory();
        });
    }

    function init() {
        var fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'],
                styles = ['常规', '斜体', '粗体', '粗偏斜体'],
                sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

        console.log(',,,,,,,');
        var family = new fontList();
        family.show({
            container: '.notepad-dlg-font .font-family',
            width: '176px',
            list: fonts,
            isFont: true,
            select: fonts.indexOf(cfg.family),
            selectHandler: function(e) {
                console.log(fonts[e]);
                cfg.family = fonts[e];
                sample();
            }
        });

        var fstyle = new fontList();
        fstyle.show({
            container: '.notepad-dlg-font .font-style',
            width: '132px',
            list: styles,
            select: styles.indexOf(cfg.style),
            isFontStyle: true,
            selectHandler: function(e) {
                console.log(styles[e]);
                cfg.style = styles[e];
                sample();
            }
        });

        var fsize = new fontList();
        fsize.show({
            container: '.notepad-dlg-font .font-size',
            width: '64px',
            list: sizes,
            select: sizes.indexOf(cfg.size),
            selectHandler: function(e) {
                console.log(sizes[e]);
                cfg.size = sizes[e];
                sample();
            }
        });
    }


    

    fontlg.click(function(e) {
        e.stopPropagation();
    });

    return { show: show };
}());