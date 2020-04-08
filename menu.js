/*global $:true*/

var $menubar = (function () {
    var $bar = $('<div class="menubar"></div>');

    var menuData;
    var menus = [];

    var active = -1;

    console.log('dsfads');

    function showTitle() {
        var $titlelist = $('<ul class="note-title"></ul>');
        for (var i = 0; i < menuData.length; i++) {
            console.log(menuData[i]['title']);
            var newli = $('<li class="title"></li>');

            newli.html(menuData[i]['title']);
            newli.attr('data-id', i);

            $titlelist.append(newli);

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
        $bar.append($titlelist);
        $('.main').append($bar);
    }

    function showDetail() {
        for (var i = 0; i < menuData.length; i++) {
            var $detailbox = $('<ul class="details"></ul>');
            var details = menuData[i]['menuItems'];

            for (var k = 0; k < details.length; k++) {
                switch (details[k]['title']) {
                    case 'hr':
                        var $newhr = $('<li class="menuhr"></li>');
                        $detailbox.append($newhr);
                        // console.log('new hr!!!');
                        break;
                    default:
                        var $newli = $('<li class="menuitems"></li>');
                        var $newspan = $('<span class="shortcut"></span>');
                        $newli.html(details[k]['title']);
                        $newspan.html(details[k]['shortcut']);

                        $newli.html(details[k].title);
                        $newli.attr('data-x', i);
                        $newli.attr('data-y', k);

                        if (details[k]['shortcut'] !== '') {
                            var $shorcut = $('<span class="kjkey"></span>');

                            $shorcut.html(details[k]['shortcut']);
                            $newli.append($shorcut);
                        }

                        if (!details[k].enabled)
                            $newli.addClass('forbid');


                        $newli.append($newspan);
                        $detailbox.append($newli);

                        $newli.click(function () {
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
            $detailbox.css({
                width: menuData[i].width,
                left: menuData[i].left,
                display: 'none'
            });

            $bar.append($detailbox);
            menus.push($detailbox);
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

        $('body').append($bar);
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