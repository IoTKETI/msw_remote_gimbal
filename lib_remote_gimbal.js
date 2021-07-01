/**
 * Created by Wonseok, Jung in KETI on 2021-06-25.
 */

var mqtt = require('mqtt');
var fs = require('fs');
let SerialPort = require('serialport');

let sbusPort = null;

let sbusPortNum = libPort;
let sbusBaudrate = libBaudrate;

global.ch_min_val = 223; // 00 DF
global.ch_mid_val = 1023; // 03 FF
global.ch_max_val = 1823; // 07 1F

global.ch_gap = 1;
// data_range_each_CH = 0~2047

const RC = 0;
const GIMBAL = 1;

global.REMOTE_FLAG = GIMBAL;

let TIMEOUT = 100;
let VALUE_CHANGE_TIMEOUT = 50;

let ch_val = 0;
let ch_num = 0;

function key_to_signal() {
    if (ch_num === 1) {
        ch1_key(ch_val);
    } else if (ch_num === 2) {
        ch2_key(ch_val);  // Tilt UP/DOWN
    } else if (ch_num === 3) {
        ch3_key(ch_val);
    } else if (ch_num === 4) {
        ch4_key(ch_val);  // Pan Right/LEFT
    } else if (ch_num === 5) {
        ch5_key(ch_val);  // Operation Mode
    } else if (ch_num === 6) {
        ch6_key(ch_val);  // Tilt Rate
    } else if (ch_num === 7) {
        ch7_key(ch_val);  // Pan Rate
    } else if (ch_num === 8) {
        ch8_key(ch_val);
    } else if (ch_num === 9) {
        ch9_key(ch_val);  // CAMERA ZOOM
    } else if (ch_num === 10) {
        ch10_key(ch_val);
    } else if (ch_num === 11) {
        ch11_key(ch_val);  // CAMERA REC
    } else if (ch_num === 12) {
        ch12_key(ch_val);  // CAMERA POWER
    } else if (ch_num === 13) {
        ch13_key(ch_val);
    } else if (ch_num === 14) {
        ch14_key(ch_val);
    } else if (ch_num === 15) {
        ch15_key(ch_val);
    } else if (ch_num === 16) {
        ch16_key(ch_val);
    } else {
        ch17_key();

        // if (REMOTE_FLAG == RC) {
        //     ch1 = parseInt(ch_mid_val);
        //     ch2 = parseInt(ch_mid_val);
        //     ch3 = parseInt(ch_mid_val);
        //     ch4 = parseInt(ch_mid_val);
        // } else if (REMOTE_FLAG == GIMBAL) {
        //     ch2 = parseInt(ch_mid_val);
        //     ch4 = parseInt(ch_mid_val);
        //     ch9 = parseInt(ch_mid_val);
        // }
    }
}

function ch1_key(ch_val) {
    if (parseInt(ch1) < parseInt(ch_val)) {
        let ch1_up_interval = setInterval(function () {
            if (parseInt(ch1) >= parseInt(ch_val)) {
                clearInterval(ch1_up_interval);
            }
            else {
                ch1 = parseInt(ch1) + ch_gap;
            }
        }, VALUE_CHANGE_TIMEOUT);
    }
    else if (parseInt(ch1) > parseInt(ch_val)) {
        let ch1_down_interval = setInterval(function () {
            if (parseInt(ch1) <= parseInt(ch_val)) {
                clearInterval(ch1_down_interval);
            }
            else {
                ch1 = parseInt(ch1) - ch_gap;
            }
        }, VALUE_CHANGE_TIMEOUT);
    }
    ch_num = 0;
}


function ch2_key(ch_val) {
    let ch2_interval = setInterval(function () {
        if (parseInt(ch2) < parseInt(ch_val)) {
            let ch2_up_interval = setInterval(function () {
                if (parseInt(ch2) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch2_up_interval);
                } else {
                    ch2 = parseInt(ch2) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch2) > parseInt(ch_val)) {
            let ch2_down_interval = setInterval(function () {
                if (parseInt(ch2) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch2_down_interval);
                } else {
                    ch2 = parseInt(ch2) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch2_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch3_key(ch_val) {
    let ch3_interval = setInterval(function () {
        if (parseInt(ch3) < parseInt(ch_val)) {
            let ch3_up_interval = setInterval(function () {
                if (parseInt(ch3) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch3_up_interval);
                } else {
                    ch3 = parseInt(ch3) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch3) > parseInt(ch_val)) {
            let ch3_down_interval = setInterval(function () {
                if (parseInt(ch3) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch3_down_interval);
                } else {
                    ch3 = parseInt(ch3) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch3_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch4_key(ch_val) {
    let ch4_interval = setInterval(function () {
        if (parseInt(ch4) < parseInt(ch_val)) {
            let ch4_up_interval = setInterval(function () {
                if (parseInt(ch4) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch4_up_interval);
                } else {
                    ch4 = parseInt(ch4) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch4) > parseInt(ch_val)) {
            let ch4_down_interval = setInterval(function () {
                if (parseInt(ch4) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch4_down_interval);
                } else {
                    ch4 = parseInt(ch4) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch4_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}

// Operation Mode
function ch5_key(ch_val) {
    let ch5_interval = setInterval(function () {
        if (parseInt(ch5) < parseInt(ch_val)) {
            let ch5_up_interval = setInterval(function () {
                if (parseInt(ch5) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch5_up_interval);
                } else {
                    ch5 = parseInt(ch5) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch5) > parseInt(ch_val)) {
            let ch5_down_interval = setInterval(function () {
                if (parseInt(ch5) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch5_down_interval);
                } else {
                    ch5 = parseInt(ch5) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch5_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch6_key(ch_val) {
    let ch6_interval = setInterval(function () {
        if (parseInt(ch6) < parseInt(ch_val)) {
            let ch6_up_interval = setInterval(function () {
                if (parseInt(ch6) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch6_up_interval);
                } else {
                    ch6 = parseInt(ch6) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch6) > parseInt(ch_val)) {
            let ch6_down_interval = setInterval(function () {
                if (parseInt(ch6) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch6_down_interval);
                } else {
                    ch6 = parseInt(ch6) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch6_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch7_key(ch_val) {
    let ch7_interval = setInterval(function () {
        if (parseInt(ch7) < parseInt(ch_val)) {
            let ch7_up_interval = setInterval(function () {
                if (parseInt(ch7) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch7_up_interval);
                } else {
                    ch7 = parseInt(ch7) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch7) > parseInt(ch_val)) {
            let ch7_down_interval = setInterval(function () {
                if (parseInt(ch7) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch7_down_interval);
                } else {
                    ch7 = parseInt(ch7) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch7_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch8_key(ch_val) {
    let ch8_interval = setInterval(function () {
        if (parseInt(ch8) < parseInt(ch_val)) {
            let ch8_up_interval = setInterval(function () {
                if (parseInt(ch8) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch8_up_interval);
                } else {
                    ch8 = parseInt(ch8) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch8) > parseInt(ch_val)) {
            let ch8_down_interval = setInterval(function () {
                if (parseInt(ch8) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch8_down_interval);
                } else {
                    ch8 = parseInt(ch8) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch8_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}

// Camera Zoom
function ch9_key(ch_val) {
    let ch9_interval = setInterval(function () {
        if (parseInt(ch9) < parseInt(ch_val)) {
            let ch9_up_interval = setInterval(function () {
                if (parseInt(ch9) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch9_up_interval);
                } else {
                    ch9 = parseInt(ch9) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch9) > parseInt(ch_val)) {
            let ch9_down_interval = setInterval(function () {
                if (parseInt(ch9) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch9_down_interval);
                } else {
                    ch9 = parseInt(ch9) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch9_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}

// Camera Focus
function ch10_key(ch_val) {
    let ch10_interval = setInterval(function () {
        if (parseInt(ch10) < parseInt(ch_val)) {
            let ch10_up_interval = setInterval(function () {
                if (parseInt(ch10) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch10_up_interval);
                } else {
                    ch10 = parseInt(ch10) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch10) > parseInt(ch_val)) {
            let ch10_down_interval = setInterval(function () {
                if (parseInt(ch10) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch10_down_interval);
                } else {
                    ch10 = parseInt(ch10) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch10_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}

// Camera REC
function ch11_key(ch_val) {
    let ch11_interval = setInterval(function () {
        if (parseInt(ch11) < parseInt(ch_val)) {
            let ch11_up_interval = setInterval(function () {
                if (parseInt(ch11) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch11_up_interval);
                } else {
                    ch11 = parseInt(ch11) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch11) > parseInt(ch_val)) {
            let ch11_down_interval = setInterval(function () {
                if (parseInt(ch11) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch11_down_interval);
                } else {
                    ch11 = parseInt(ch11) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch11_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}

// CAMERA_POWER
function ch12_key(ch_val) {
    let ch12_interval = setInterval(function () {
        if (parseInt(ch12) < parseInt(ch_val)) {
            let ch12_up_interval = setInterval(function () {
                if (parseInt(ch12) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch12_up_interval);
                } else {
                    ch12 = parseInt(ch12) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch12) > parseInt(ch_val)) {
            let ch12_down_interval = setInterval(function () {
                if (parseInt(ch12) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch12_down_interval);
                } else {
                    ch12 = parseInt(ch12) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch12_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch13_key(ch_val) {
    let ch13_interval = setInterval(function () {
        if (parseInt(ch13) < parseInt(ch_val)) {
            let ch13_up_interval = setInterval(function () {
                if (parseInt(ch13) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch13_up_interval);
                } else {
                    ch13 = parseInt(ch13) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch13) > parseInt(ch_val)) {
            let ch13_down_interval = setInterval(function () {
                if (parseInt(ch13) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch13_down_interval);
                } else {
                    ch13 = parseInt(ch13) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch13_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch14_key(ch_val) {
    let ch14_interval = setInterval(function () {
        if (parseInt(ch14) < parseInt(ch_val)) {
            let ch14_up_interval = setInterval(function () {
                if (parseInt(ch14) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch14_up_interval);
                } else {
                    ch14 = parseInt(ch14) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch14) > parseInt(ch_val)) {
            let ch14_down_interval = setInterval(function () {
                if (parseInt(ch14) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch14_down_interval);
                } else {
                    ch14 = parseInt(ch14) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch14_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch15_key(ch_val) {
    let ch15_interval = setInterval(function () {
        if (parseInt(ch15) < parseInt(ch_val)) {
            let ch15_up_interval = setInterval(function () {
                if (parseInt(ch15) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch15_up_interval);
                } else {
                    ch15 = parseInt(ch15) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch15) > parseInt(ch_val)) {
            let ch15_down_interval = setInterval(function () {
                if (parseInt(ch15) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch15_down_interval);
                } else {
                    ch15 = parseInt(ch15) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch15_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch16_key(ch_val) {
    let ch16_interval = setInterval(function () {
        if (parseInt(ch16) < parseInt(ch_val)) {
            let ch16_up_interval = setInterval(function () {
                if (parseInt(ch16) >= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch16_up_interval);
                } else {
                    ch16 = parseInt(ch16) + ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        } else if (parseInt(ch16) > parseInt(ch_val)) {
            let ch16_down_interval = setInterval(function () {
                if (parseInt(ch16) <= parseInt(ch_val)) {
                    ch_num = 0;
                    clearInterval(ch16_down_interval);
                } else {
                    ch16 = parseInt(ch16) - ch_gap;
                }
            }, VALUE_CHANGE_TIMEOUT);
        }
        else {
            ch_num = 0;
            clearInterval(ch16_interval);
        }
    }, VALUE_CHANGE_TIMEOUT);
}


function ch17_key() {
    ch17 = Math.floor(Math.random() * (347 - 325 + 1)) + 325;
}


setInterval(channel_val, TIMEOUT);

setInterval(key_to_signal, TIMEOUT);

global.rxbuf = '';

global.ch1 = parseInt(ch_mid_val);
global.ch2 = parseInt(ch_mid_val);
global.ch3 = parseInt(ch_mid_val);
global.ch4 = parseInt(ch_mid_val);
global.ch5 = parseInt(ch_mid_val);
global.ch6 = parseInt(ch_min_val);
global.ch7 = parseInt(ch_min_val);
global.ch8 = parseInt(ch_min_val);
global.ch9 = parseInt(ch_mid_val);
global.ch10 = parseInt(ch_min_val);
global.ch11 = parseInt(ch_mid_val);
global.ch12 = parseInt(ch_min_val);
global.ch13 = parseInt(ch_min_val);
global.ch14 = parseInt(ch_min_val);
global.ch15 = parseInt(ch_min_val);
global.ch16 = parseInt(ch_min_val);
global.ch17 = parseInt(330);

function channel_val() {
    // console.log('ch1: ', ch1, 'ch2: ', ch2, 'ch3: ', ch3, 'ch4: ', ch4);

    rxbuf = '';
    rxbuf += 'C0';
    rxbuf += 'D0';
    // CH1 - Roll
    hex_ch1 = ch1.toString(16);
    hex_ch1 = hex_ch1.padStart(4, '0');
    let ch1_high_byte = hex_ch1.substr(0, 2);
    let ch1_low_byte = hex_ch1.substr(2, 2);
    rxbuf += ch1_high_byte;
    rxbuf += ch1_low_byte;
    // CH2 - Pitch
    hex_ch2 = ch2.toString(16);
    hex_ch2 = hex_ch2.padStart(4, '0');
    let ch2_high_byte = hex_ch2.substr(0, 2);
    let ch2_low_byte = hex_ch2.substr(2, 2);
    rxbuf += ch2_high_byte;
    rxbuf += ch2_low_byte;
    // CH3 - Throttle
    hex_ch3 = ch3.toString(16);
    hex_ch3 = hex_ch3.padStart(4, '0');
    let ch3_high_byte = hex_ch3.substr(0, 2);
    let ch3_low_byte = hex_ch3.substr(2, 2);
    rxbuf += ch3_high_byte;
    rxbuf += ch3_low_byte;
    // CH4 - Yaw
    hex_ch4 = ch4.toString(16);
    hex_ch4 = hex_ch4.padStart(4, '0');
    let ch4_high_byte = hex_ch4.substr(0, 2);
    let ch4_low_byte = hex_ch4.substr(2, 2);
    rxbuf += ch4_high_byte;
    rxbuf += ch4_low_byte;
    // Switch 1
    hex_ch5 = ch5.toString(16);
    hex_ch5 = hex_ch5.padStart(4, '0');
    let ch5_high_byte = hex_ch5.substr(0, 2);
    let ch5_low_byte = hex_ch5.substr(2, 2);
    rxbuf += ch5_high_byte;
    rxbuf += ch5_low_byte;
    // Switch 2
    hex_ch6 = ch6.toString(16);
    hex_ch6 = hex_ch6.padStart(4, '0');
    let ch6_high_byte = hex_ch6.substr(0, 2);
    let ch6_low_byte = hex_ch6.substr(2, 2);
    rxbuf += ch6_high_byte;
    rxbuf += ch6_low_byte;
    // Switch 3
    hex_ch7 = ch7.toString(16);
    hex_ch7 = hex_ch7.padStart(4, '0');
    let ch7_high_byte = hex_ch7.substr(0, 2);
    let ch7_low_byte = hex_ch7.substr(2, 2);
    rxbuf += ch7_high_byte;
    rxbuf += ch7_low_byte;
    // Switch 4
    hex_ch8 = ch8.toString(16);
    hex_ch8 = hex_ch8.padStart(4, '0');
    let ch8_high_byte = hex_ch8.substr(0, 2);
    let ch8_low_byte = hex_ch8.substr(2, 2);
    rxbuf += ch8_high_byte;
    rxbuf += ch8_low_byte;
    // Switch 5
    hex_ch9 = ch9.toString(16);
    hex_ch9 = hex_ch9.padStart(4, '0');
    let ch9_high_byte = hex_ch9.substr(0, 2);
    let ch9_low_byte = hex_ch9.substr(2, 2);
    rxbuf += ch9_high_byte;
    rxbuf += ch9_low_byte;
    // Switch 6
    hex_ch10 = ch10.toString(16);
    hex_ch10 = hex_ch10.padStart(4, '0');
    let ch10_high_byte = hex_ch10.substr(0, 2);
    let ch10_low_byte = hex_ch10.substr(2, 2);
    rxbuf += ch10_high_byte;
    rxbuf += ch10_low_byte;
    // Switch 7
    hex_ch11 = ch11.toString(16);
    hex_ch11 = hex_ch11.padStart(4, '0');
    let ch11_high_byte = hex_ch11.substr(0, 2);
    let ch11_low_byte = hex_ch11.substr(2, 2);
    rxbuf += ch11_high_byte;
    rxbuf += ch11_low_byte;
    // Switch 8
    hex_ch12 = ch12.toString(16);
    hex_ch12 = hex_ch12.padStart(4, '0');
    let ch12_high_byte = hex_ch12.substr(0, 2);
    let ch12_low_byte = hex_ch12.substr(2, 2);
    rxbuf += ch12_high_byte;
    rxbuf += ch12_low_byte;
    // Switch 9
    hex_ch13 = ch13.toString(16);
    hex_ch13 = hex_ch13.padStart(4, '0');
    let ch13_high_byte = hex_ch13.substr(0, 2);
    let ch13_low_byte = hex_ch13.substr(2, 2);
    rxbuf += ch13_high_byte;
    rxbuf += ch13_low_byte;
    // Switch 10
    hex_ch14 = ch14.toString(16);
    hex_ch14 = hex_ch14.padStart(4, '0');
    let ch14_high_byte = hex_ch14.substr(0, 2);
    let ch14_low_byte = hex_ch14.substr(2, 2);
    rxbuf += ch14_high_byte;
    rxbuf += ch14_low_byte;
    // Switch 11
    hex_ch15 = ch15.toString(16);
    hex_ch15 = hex_ch15.padStart(4, '0');
    let ch15_high_byte = hex_ch15.substr(0, 2);
    let ch15_low_byte = hex_ch15.substr(2, 2);
    rxbuf += ch15_high_byte;
    rxbuf += ch15_low_byte;
    // Switch 12
    hex_ch16 = ch16.toString(16);
    hex_ch16 = hex_ch16.padStart(4, '0');
    let ch16_high_byte = hex_ch16.substr(0, 2);
    let ch16_low_byte = hex_ch16.substr(2, 2);
    rxbuf += ch16_high_byte;
    rxbuf += ch16_low_byte;
    // Switch 13
    hex_ch17 = ch17.toString(16);
    hex_ch17 = hex_ch17.padStart(4, '0');
    let ch17_high_byte = hex_ch17.substr(0, 2);
    let ch17_low_byte = hex_ch17.substr(2, 2);
    rxbuf += ch17_high_byte;
    rxbuf += ch17_low_byte;
    checksum_extra();
    // rxbuf += '00';
    // console.log(rxbuf);
    console.log(Buffer.from(rxbuf, 'hex'));
    // sbusPort.write(Buffer.from(rxbuf, 'hex'))
    sbusData();
}

function checksum_extra() {
    var crc_res = 0;
    for (let i = 0; i < 34; i++) {
        crc_res += parseInt(rxbuf.substr(4 + (i * 2), 2), 16);
        crc_res = crc_res & 0x00ff;
    }

    crc_res = crc_res & 0x00ff;

    crc_res = crc_res.toString(16);
    hex_crc_res = crc_res.toString(16);
    hex_crc_res = hex_crc_res.padEnd(4, '0');
    let crc_res_byte = hex_crc_res.substr(0, 2);
    let tail_byte = hex_crc_res.substr(2, 2);
    rxbuf += crc_res_byte;
    rxbuf += tail_byte;
}


function sbusData () {
    let sbus = {};
    sbus.ch1 = ch1;
    sbus.ch2 = ch2;
    sbus.ch3 = ch3;
    sbus.ch4 = ch4;
    sbus.ch5 = ch5;
    sbus.ch6 = ch6;
    sbus.ch7 = ch7;
    sbus.ch8 = ch8;
    sbus.ch9 = ch9;
    sbus.ch10 = ch10;
    sbus.ch11 = ch11;
    sbus.ch12 = ch12;
    sbus.ch13 = ch13;
    sbus.ch14 = ch14;
    sbus.ch15 = ch15;
    sbus.ch16 = ch16;
    sbus.ch17 = ch17;
    lib_mqtt_client.publish(data_topic, JSON.stringify(sbus));
}


// sbusPortOpening();

function sbusPortOpening() {
    if (sbusPort == null) {
        sbusPort = new SerialPort(libPort, {
            baudRate: parseInt(libBaudrate, 10),
        });

        sbusPort.on('open', sbusPortOpen);
        sbusPort.on('close', sbusPortClose);
        sbusPort.on('error', sbusPortError);
        sbusPort.on('data', sbusPortData);
    } else {
        if (sbusPort.isOpen) {

        } else {
            sbusPort.open();
        }
    }
}

function sbusPortOpen() {
    console.log('sbusPort open. ' + libPort + ' Data rate: ' + libBaudrate);
}

function sbusPortClose() {
    console.log('sbusPort closed.');

    setTimeout(sbusPortOpening, 2000);
}

function sbusPortError(error) {
    let error_str = error.toString();
    console.log('[sbusPort error]: ' + error.message);
    if (error_str.substring(0, 14) == "Error: Opening") {

    } else {
        console.log('sbusPort error : ' + error);
    }

    setTimeout(sbusPortOpening, 2000);
}

function sbusPortData(data) {
    //console.log(data.toString());
}


let lib = {};
try {
    lib = JSON.parse(fs.readFileSync('./' + config.directory_name + '/lib_sparrow_gun.json', 'utf8'));
} catch (e) {
    lib = {
        name: 'lib_remote_sbus',
        target: 'armv6',
        description: "node [name] [portnum] [baudrate]",
        scripts: 'node lib_remote_sbus /dev/ttyUSB3 115200',
        data: ['SBUS'],
        control: ['REMOTE']
    };
}

let lib_mqtt_client = null;

lib_mqtt_connect('localhost', 1883);

let control_topic = '/MUV/control/' + lib.name + '/' + lib.control[0]
let data_topic = '/MUV/data/' + lib.name + '/' + lib.data[0]

function lib_mqtt_connect(broker_ip, port) {
    if (lib_mqtt_client == null) {
        var connectOptions = {
            host: broker_ip,
            port: port,
            protocol: "mqtt",
            keepalive: 10,
            protocolId: "MQTT",
            protocolVersion: 4,
            clean: true,
            reconnectPeriod: 2000,
            connectTimeout: 2000,
            rejectUnauthorized: false
        };

        lib_mqtt_client = mqtt.connect(connectOptions);
    }

    lib_mqtt_client.on('connect', function () {
        console.log('[lib_mqtt_connect] connected to ' + broker_ip);
        lib_mqtt_client.subscribe(control_topic);
        console.log('[lib_mqtt_connect] control_topic: ' + control_topic);
    });

    lib_mqtt_client.on('message', function (topic, message) {
        if (topic === control_topic) {
            let obj_lib_data = JSON.parse(message);

            ch_num = parseInt(obj_lib_data.ch_num);
            ch_val = parseInt(obj_lib_data.ch_val);
        }
    });

    lib_mqtt_client.on('error', function (err) {
        console.log(err.message);
    });
}

