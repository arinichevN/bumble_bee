function AlertHistory() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.data = [];//[id, mark, value, status]
    this.initialized = false;
    this.t1 = null;
    this.updateB = null;
    this.deleteB = null;
    this.deleteAllB = null;
    this.bb = null;
    this.update = true;//editor will make it false
    this.EDIT = {ITEM: 0};
    this.ACTION = {
        GET: 1,
        DELETE: 2,
        DELETEALL: 3
    };
    this.visible = false;
    this.init = function () {
        try {
            var self = this;
            this.container = cvis();
            this.t1 = new Table(self, 1, trans, [[302, "35%"], [311, "65%"]]);
            this.t1.m_style = "copy_cell";
            this.t1.cellClickControl([true, true, ]);
            this.t1.enable();
            this.updateB = cb("");
            this.deleteB = cb("");
            this.deleteAllB = cb("");
            this.bb = new BackButton();
            this.updateB.onclick = function () {
                self.getAll();
            };
            this.deleteB.onclick = function () {
                self.delete();
            };
            this.deleteAllB.onclick = function () {
                self.deleteAll();
            };
            var rcont = cd();
            a(rcont, [this.updateB, this.deleteB, this.deleteAllB, this.bb]);
            a(this.container, [this.t1, rcont]);
            cla([this.t1], ["w70m", "lg1"]);
            cla([rcont], ["w30m", "lg1"]);
            cla([this.updateB, this.deleteB, this.deleteAllB, this.bb], ["h25m", "ug1", "f1"]);
            this.initialized = true;
        } catch (e) {
            alert("alert_history: init: " + e.message);
        }
    };
    this.getName = function () {
        try {
            return trans.get(406);
        } catch (e) {
            alert("alert_history: getName: " + e.message);
        }
    };
    this.updateStr = function () {
        try {
            this.t1.updateHeader();
            this.updateB.innerHTML = trans.get(314);
            this.deleteB.innerHTML = trans.get(312);
            this.deleteAllB.innerHTML = trans.get(313);
            this.bb.updateStr();
        } catch (e) {
            alert("alert_history: updateStr: " + e.message);
        }
    };
    this.cellChanged = function (id) {
        try {
            this.btnCntl();
        } catch (e) {
            alert("pid: cellChanged: " + e.message);
        }
    };
    this.btnCntl = function () {
        if (this.data.length) {
            this.deleteAllB.disabled = false;
        } else {
            this.deleteAllB.disabled = true;
        }
        if (this.t1.sr >= 0) {
            this.deleteB.disabled = false;
        } else {
            this.deleteB.disabled = true;
        }
    };
    this.delete = function () {
        var data = [
            {
                action: ['alert_history', 'delete'],
                param: {mark: this.data[this.t1.sr].mark}
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, this.ACTION.DELETE, "json_db");
    };
    this.deleteAll = function () {
        var data = [
            {
                action: ['alert_history', 'deleteall']
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, this.ACTION.DELETEALL, "json_db");
    };
    this.getAll = function () {
        var data = [
            {
                action: ['alert_history', 'geta']
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, this.ACTION.GET, "json_db");
    };
    this.confirm = function (action, d, n) {
        try {
            switch (action) {
                case this.ACTION.GET:
                    cleara(this.data);
                    var i = 0;
                    for (i = 0; i < d.length; i++) {
                        this.data.push({
                            mark: parseInt(d[i].mark),
                            mark_str: d[i].mark_str,
                            message: d[i].message
                        });
                    }
                    this.redrawTbl();
                    this.btnCntl();
                    break;
                case this.ACTION.DELETE:
                    this.data.splice(this.t1.sr, 1);
                    this.t1.deleteSelectedRow();
                    this.btnCntl();
                    break;
                case this.ACTION.DELETEALL:
                    cleara(this.data);
                    this.redrawTbl();
                    this.btnCntl();
                    break;
                default:
                    console.log("confirm: unknown action");
                    break;
            }
            cursor_blocker.disable();
        } catch (e) {
            alert("alert_history: confirm: " + e.message);
        }

    };
    this.abort = function (action, m, n) {
        try {
            switch (action) {
                case this.ACTION.GET:
                    logger.fail();
                    break;
                case this.ACTION.DELETE:
                    logger.fail();
                    break;
                case this.ACTION.DELETEALL:
                    logger.fail();
                    break;

                default:
                    console.log("abort: unknown action");
                    break;
            }
            cursor_blocker.disable();
        } catch (e) {
            alert("alert_history: abort: " + e.message);
        }
    };
    this.redrawTbl = function () {
        try {
            this.t1.clear();
            for (var i = 0; i < this.data.length; i++) {
                this.t1.appendRow([this.data[i].mark_str, this.data[i].message]);
            }
        } catch (e) {
            alert("alert_history: redrawTbl: " + e.message);
        }
    };
    this.show = function () {
        try {
            clr(this.container, 'hdn');
            this.visible = true;
            document.title = vmenu_main.getName() + ": " + this.getName();
            this.btnCntl();
            this.getAll();
        } catch (e) {
            alert("alert_history: show: " + e.message);
        }
    };
    this.hide = function () {
        try {
            cla(this.container, 'hdn');
            this.visible = false;
        } catch (e) {
            alert("alert_history: hide: " + e.message);
        }
    };
}
var valert_history = new AlertHistory();
visu.push(valert_history);
