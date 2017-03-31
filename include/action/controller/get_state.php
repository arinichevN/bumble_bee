<?php

namespace controller;

class get_state {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \sock\init($p['peer']['address'], $p['peer']['port'], 1);
        \acp\sendPackBroadcast(ACP_CMD_APP_PING);
        $data= \acp\getBufParseStateData();
        \sock\suspend();
        return $data;
    }

}
