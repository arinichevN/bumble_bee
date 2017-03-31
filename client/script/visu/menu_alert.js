function MenuAlert() {
    this.type = VISU_TYPE.TOP;
    this.container = null;
    this.initialized = false;
    this.updated = false;
    this.b1 = null;
    this.b2 = null;
    this.b3 = null;
    this.b4 = null;
    this.bb = null;
    this.init = function () {
        try {
            this.container = cvis();
            this.b1 = new NavigationButtonOut(app.CPATH + "/alert_db", 406);
            this.b2 = new NavigationButtonOut(app.CPATH + "/phone_db", 407);
            this.b3 = new NavigationButtonOut(app.CPATH + "/alr_conf", 322);
            this.b4 = new NavigationButtonOut(app.CPATH + "/alr_db", 323);
            this.bb = new BackButton();
            cla([this.b1, this.b2, this.b3, this.b4, this.bb], ["h20m", "ug1", "f2"]);
            a(this.container, [this.b1, this.b2, this.b3, this.b4, this.bb]);
            this.initialized = true;
        } catch (e) {
            alert("MenuAlert: init: " + e.message);
        }
    };
    this.getName = function () {
        try {
            return trans.get(404);
        } catch (e) {
            alert("MenuAlert: getName: " + e.message);
        }
    };
    this.updateStr = function () {
        try {
            this.b1.updateStr();
            this.b2.updateStr();
            this.b3.updateStr();
            this.b4.updateStr();
            this.bb.updateStr();
        } catch (e) {
            alert("MenuAlert: updateStr: " + e.message);
        }
    };
    this.show = function () {
        try {
            if (!this.updated) {
                this.updated = true;
            }
            clr(this.container, 'hdn');
            document.title = vmenu_main.getName() + ": " + this.getName();
        } catch (e) {
            alert("MenuAlert: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, 'hdn');
        } catch (e) {
            alert("menu_main: hide: " + e.message);
        }
    };
}
var vmenu_alert = new MenuAlert();
visu.push(vmenu_alert);
