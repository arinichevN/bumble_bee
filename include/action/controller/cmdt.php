<?php

namespace controller;

class cmdt {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['peer']['address'], $p['peer']['port'],1);
        \acp\sendPackBroadcast($p['cmd']);
        $data= \sock\getText(ACP_BUF_SIZE);
        \sock\suspend();
        return $data;
    }

}
