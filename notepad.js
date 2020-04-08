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