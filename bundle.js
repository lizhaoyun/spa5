module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            options: {
                configFile: '.eslintrc.json'
            },
            target: ['*.js']
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            src: './css/*.css'
        },
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            src: '*.html'
        },
        concat: {
            js: {
                src: ['*.js'],
                dest: 'dist/bundle.js'
            },
            css: {
                src: ['css/*.css'],
                dest: 'dist/bundle.css'
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        copy: {
            html: {
                src: './index.html',
                dest: './dist/index.html'
            }
        },
        uglify: {
            'dist/bundle.min.js': 'dist/bundle.js'
        },
        cssmin: {
            'dist/bundle.min.css': 'dist/bundle.css'
        },
        htmlmin: {
            options: {
                collapseWhitespace: true,
                preserveLineBreaks: false
            },
            files: {
                src: 'dist/index.html',
                dest: 'dist/index.html'
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'dist'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-eslint');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('lint', ['htmlhint', 'csslint','eslint']);
    grunt.registerTask('build', ['copy:html','useminPrepare','concat','uglify', 'cssmin','usemin',  'htmlmin']);

};
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

/*global $:true*/

var $menubar = (function () {
    var bar = $('<div class="menubar"></div>');

    var menuData;
    var menus = [];

    var active = -1;

    console.log('dsfads');

    function showTitle() {
        var titlelist = $('<ul class="note-title"></ul>');
        for (var i = 0; i < menuData.length; i++) {
            console.log(menuData[i]['title']);
            var newli = $('<li class="title"></li>');

            newli.html(menuData[i]['title']);
            newli.attr('data-id', i);

            titlelist.append(newli);

            newli.click(function () {
                var i = Number(this.dataset.id);

                if (active === -1) {
                    menus[i].css({ display: 'inline-block' });
                    active = i;
                } else if (active !== i) {
                    menus[active].css({ display: 'none' });
                    menus[i].css({ display: 'inline-block' });
                    active = i;
                } else {
                    menus[active].css({ display: 'none' });
                    active = -1;
                }
            });

            newli.hover(function () {
                if (active !== -1) {
                    var i = Number(this.dataset.id);

                    menus[active].css({ display: 'none' });
                    menus[i].css({ display: 'inline-block' });
                    active = i;
                }
            });
        }
        bar.append(titlelist);
        $('.main').append(bar);
    }

    function showDetail() {
        for (var i = 0; i < menuData.length; i++) {
            var detailbox = $('<ul class="details"></ul>');
            var details = menuData[i]['menuItems'];

            for (var k = 0; k < details.length; k++) {
                switch (details[k]['title']) {
                    case 'hr':
                        var newhr = $('<li class="menuhr"></li>');
                        detailbox.append(newhr);
                        // console.log('new hr!!!');
                        break;
                    default:
                        var newli = $('<li class="menuitems"></li>');
                        var newspan = $('<span class="shortcut"></span>');
                        newli.html(details[k]['title']);
                        newspan.html(details[k]['shortcut']);

                        newli.html(details[k].title);
                        newli.attr('data-x', i);
                        newli.attr('data-y', k);

                        if (details[k]['shortcut'] !== '') {
                            var $shorcut = $('<span class="kjkey"></span>');

                            $shorcut.html(details[k]['shortcut']);
                            newli.append($shorcut);
                        }

                        if (!details[k].enabled)
                            newli.addClass('forbid');


                        newli.append(newspan);
                        detailbox.append(newli);

                        newli.click(function () {
                            if ($(this).hasClass('forbid'))
                                return;

                            var i = this.dataset.x;
                            var j = this.dataset.y;

                            menuData[i].menuItems[j].handler();
                            menus[i].css({ display: 'none' });
                            active = -1;
                        });
                }
            }
            detailbox.css({
                width: menuData[i].width,
                left: menuData[i].left,
                display: 'none'
            });

            bar.append(detailbox);
            menus.push(detailbox);
        }
    }


    function checked(row, col, isChecked) {
        var menuItem = menus[row].find('.menu-item')[col];

        if (isChecked) {
            $(menuItem).prepend($('<span class="checked">✓</span>')[0]);
        } else {
            $(menuItem).find('.checked').remove();
        }
    }

    function enabled(row, col, isEnabled) {
        var menuItem = menus[row].find('.menu-item')[col];

        if (isEnabled) {
            $(menuItem).removeClass('kjkey');
        } else {
            $(menuItem).addClass('kjkey');
        }
    }

    function hideMenu() {
        if (active === -1) return;

        menus[active].css({ display: 'none' });
        active = -1;
    }

    function init() {
        showTitle();
        showDetail();

        $('body').append(bar);
    }

    function show(data) {
        menuData = data;
        init();
    }

    return {
        show: show,
        checked: checked,
        enabled: enabled,
        hideMenu: hideMenu
    };
}());
/*global notepad:true*/
/*global $menubar:true*/
/*global $dlgFont:true*/

notepad.menuData = [{
    title: '文件(F)',
    menuItems: [{
        title: '新建(N)',
        shortcut: 'Ctrl+N',
        enabled: true,
        handler: function () { console.log('新建(N) menu clicked!'); }
    },
    {
        title: '打开(O)...',
        shortcut: 'Ctrl+O',
        enabled: true,
        handler: function () { console.log('打开(O) menu clicked!'); }
    },
    {
        title: '保存(S)',
        shortcut: 'Ctrl+S',
        enabled: true,
        handler: function () { console.log('保存(S) menu clicked!'); }
    },
    {
        title: '另存为(A)...',
        shortcut: '',
        enabled: true,
        handler: function () { console.log('另存为(A) menu clicked!'); }
    },
    {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
    },
    {
        title: '页面设置(U)...',
        shortcut: '',
        enabled: true,
        handler: function () { console.log('页面设置(U) menu clicked!'); }
    },
    {
        title: '打印(P)...',
        shortcut: 'Ctrl+P',
        enabled: true,
        handler: function () { console.log('打印(P) menu clicked!'); }
    },
    {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
    },
    {
        title: '退出(X)',
        shortcut: '',
        enabled: true,
        handler: function () { console.log('退出(X) menu clicked!'); }
    }
    ],
    width: '202px',
    left: '0px'
},
{
    title: '编辑(E)',
    menuItems: [{
        title: '撤销(U)',
        shortcut: 'Ctrl+Z',
        enabled: false,
        handler: function () { console.log('撤销(U) menu clicked!'); }
    },
    {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
    },
    {
        title: '剪切(T)',
        shortcut: 'Ctrl+X',
        enabled: true,
        handler: function () { console.log('剪切(X) menu clicked!'); }
    },
    {
        title: '复制(C)',
        shortcut: 'Ctrl+C',
        enabled: false,
        handler: function () { console.log('复制(C) menu clicked!'); }
    },
    {
        title: '粘贴(P)',
        shortcut: 'Ctrl+V',
        enabled: false,
        handler: function () { console.log('粘贴(P) menu clicked!'); }
    },
    {
        title: '删除(L)',
        shortcut: 'Del',
        enabled: false,
        handler: function () { console.log('删除(L) menu clicked!'); }
    },
    {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
    },
    {
        title: '使用 Bing 搜索...',
        shortcut: 'Ctrl+E',
        enabled: true,
        handler: function () { console.log('使用 Bing 搜索 menu clicked!'); }
    },
    {
        title: '查找(F)...',
        shortcut: 'Ctrl+F',
        enabled: false,
        handler: function () { console.log('查找(F) menu clicked!'); }
    },
    {
        title: '查找下一个(N)',
        shortcut: 'F3',
        enabled: false,
        handler: function () { console.log('查找下一个(N) menu clicked!'); }
    },
    {
        title: '替换(R)...',
        shortcut: 'Ctrl+H',
        enabled: true,
        handler: function () { console.log('替换(R) menu clicked!'); }
    },
    {
        title: '转到(G)...',
        shortcut: 'Ctrl+G',
        enabled: true,
        handler: function () { console.log('转到(G) menu clicked!'); }
    },
    {
        title: 'hr',
        shortcut: '',
        enabled: true,
        handler: null
    },
    {
        title: '全选(A)',
        shortcut: 'Ctrl+A',
        enabled: true,
        handler: function () { console.log('全选(A) menu clicked!'); }
    },
    {
        title: '时间/日期(D)',
        shortcut: 'F5',
        enabled: true,
        handler: function () { console.log('时间/日期(D) menu clicked!'); }
    },
    ],
    width: '218px',
    left: '78px'
},
{
    title: '格式(O)',
    menuItems: [{
        title: '自动换行(W)',
        shortcut: '',
        enabled: true,
        handler: function () { console.log('自动换行(W) menu clicked!'); }
    },
    {
        title: '字体(F)...',
        shortcut: '',
        enabled: true,
        handler: function () {
            console.log('字体(F) menu clicked!');
            $dlgFont.show({
                family: notepad.fontFamily,
                style: notepad.fontStyle,
                size: notepad.fontSize,
                okHandler: notepad.fontHandler
            });
        }
    }
    ],
    width: '145px',
    left: '160px'
},
{
    title: '查看(V)',
    menuItems: [{
        title: '状态栏(S)',
        shortcut: '',
        enabled: true,
        handler: function () {
            notepad.bShowStatusBar = !notepad.bShowStatusBar;
            $menubar.checked(3, 0, notepad.bShowStatusBar);
        }
    }],
    width: '115px',
    left: '240px'
},
{
    title: '帮助(H)',
    menuItems: [{
        title: '查看帮助(H)',
        shortcut: '',
        enabled: true,
        handler: function () { console.log('查看帮助(H) menu clicked!'); }
    },
    {
        title: '关于记事本(A)',
        shortcut: '',
        enabled: true,
        handler: function () { console.log('A menu clicked!'); }
    },
    ],
    width: '145px',
    left: '320px'
}
];
/*global $:true*/
/*global showContent:true*/
/*global $menubar:true*/


var notepad = {}; // Notepad 主程序对象

notepad.config = {
    'appContainer': '.notepad-app'
};

notepad.bShowStatusBar = false; // 是否显示状态栏
notepad.bLineWrap = false;
notepad.fontFamily = 'Arial'; // 默认字体
notepad.fontStype = '常规'; // 默认字体样式
notepad.fontSize = '16'; // 默认字体大小：16pt

console.log('this is notepad.js');
notepad.fontHandler = function(e) {
    notepad.fontFamily = e.family;
    notepad.fontStype = e.style;
    notepad.fontSize = e.size;

    showContent.setFont(e);
};

$(function () {
    $menubar.show(notepad.menuData);
    showContent.show();
    showContent.setFont({
        family: notepad.fontFamily,
        style: notepad.fontStype,
        size: notepad.fontSize
    });

    var $noteditor = $('.notepad-editor');

    $noteditor.click(function () {
        console.log('nbj');
        $menubar.hideMenu();
        showContent.focus();
    });
});
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