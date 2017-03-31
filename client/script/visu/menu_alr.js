function MenuAlr() {
    this.type = VISU_TYPE.TOP;
    this.container = null;
    this.initialized = false;
    this.updated = false;
    this.b1 = null;
    this.b2 = null;
    this.bb = null;
    this.init = function () {
        try {
            this.container = cvis();
            this.b1 = new NavigationButtonOut("../alr_cl", 318,"f_js/image/control.png");
            this.b2 = new NavigationButtonOut("../alr_db", 319,"f_js/image/settings.png");
            this.bb = new BackButton();
            cla([this.b1, this.b2, this.bb], ["h33m", "ug1", "f2"]);
            a(this.container, [this.b1, this.b2, this.bb]);
            this.initialized = true;
        } catch (e) {
            alert("MenuAlr: init: " + e.message);
        }
    };
    this.getName = function () {
        try {
            return trans.get(408);
        } catch (e) {
            alert("MenuAlr: getName: " + e.message);
        }
    };
    this.updateStr = function () {
        try {
            this.b1.updateStr();
            this.b2.updateStr();
            this.bb.updateStr();
        } catch (e) {
            alert("MenuAlr: updateStr: " + e.message);
        }
    };
    this.show = function () {
        try {
            if (!this.updated) {
                this.updated = true;
            }
            clr(this.container, 'hdn');
            document.title =  vmenu_main.getName() + ": " + this.getName();
        } catch (e) {
            alert("MenuAlr: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, 'hdn');
        } catch (e) {
            alert("MenuAlr: hide: " + e.message);
        }
    };
}
var vmenu_alr = new MenuAlr();
visu.push(vmenu_alr);
