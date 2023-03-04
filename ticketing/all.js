    function http_get_json(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);  // `false` makes the request synchronous
        request.send(null);

        var resposeText = "";
        if (request.status === 200) {
            resposeText = request.responseText;
        }
        return JSON.parse(resposeText);
    }


function http_post_json(url, json_object) {
 var request = new XMLHttpRequest();   // new HttpRequest instance 
var theUrl = url;
request.open("POST", theUrl);
request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
request.send(JSON.stringify(json_object));   
        var resposeText = "";
        if (request.status === 200) {
            resposeText = request.responseText;
        }
        //return JSON.parse(resposeText);
    return resposeText;
}


function get_element_by_xpath(xpath) {
  let result_element = document.evaluate (xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  return result_element;
}


function get_angluarjs_scope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}



    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    async function waitForXpathNode(xpath) {
        while (true) {
            let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                return element;
            }
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }

    function waitForElm_angularjs(ctrlName) {
        console.log('waitForElm_angularjs');
        return new Promise(resolve => {
            let sel = 'div[ng-controller="' + ctrlName + '"]';
            let ctrl = angular.element(sel).scope();

            if (angular.element(sel).scope()) {
                return resolve(angular.element(sel).scope());
            }

            const observer = new MutationObserver(mutations => {
                if (angular.element(sel).scope()) {
                    resolve(angular.element(sel).scope());
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }





    function override_alert() {

        var alrtScope;
        if (typeof unsafeWindow === "undefined") {
            alrtScope = window;
        } else {
            alrtScope = unsafeWindow;
        }

        alrtScope.alert = function (str) {
            console.log ("Greasemonkey intercepted alert: ", str);
        };

    }

function send_message(message) {
    try {
      send_message_localhost(message);
    } catch (error) {
      send_message_server(message);
    }

}


function send_message_localhost(message) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "http://127.0.0.1:8520/sendmessage/";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({"text": message}));
}


function send_message_server(message) {
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    var theUrl = "https://ticket.willtechhk.com/sendmessage/";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({"text": message}));
}


function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function int_to_char(int_value) {
    return String.fromCharCode(int_value);
}



function eraseCookie (cookieName) {
    //--- ONE-TIME INITS:
    //--- Set possible domains. Omits some rare edge cases.?.
    var domain      = document.domain;
    var domain2     = document.domain.replace (/^www\./, "");
    var domain3     = document.domain.replace (/^(\w+\.)+?(\w+\.\w+)$/, "$2");;

    //--- Get possible paths for the current page:
    var pathNodes   = location.pathname.split ("/").map ( function (pathWord) {
        return '/' + pathWord;
    } );
    var cookPaths   = [""].concat (pathNodes.map ( function (pathNode) {
        if (this.pathStr) {
            this.pathStr += pathNode;
        }
        else {
            this.pathStr = "; path=";
            return (this.pathStr + pathNode);
        }
        return (this.pathStr);
    } ) );

    ( eraseCookie = function (cookieName) {
        //--- For each path, attempt to delete the cookie.
        cookPaths.forEach ( function (pathStr) {
            //--- To delete a cookie, set its expiration date to a past value.
            var diagStr     = cookieName + "=" + pathStr + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = diagStr;

            document.cookie = cookieName + "=" + pathStr + "; domain=" + domain  + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=" + pathStr + "; domain=" + domain2 + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
            document.cookie = cookieName + "=" + pathStr + "; domain=" + domain3 + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
        } );
    } ) (cookieName);
}

function deleteAllCookie() {
    var cookieList  = document.cookie.split (/;\s*/);
    for (var J = cookieList.length - 1;   J >= 0;  --J) {
        var cookieName = cookieList[J].replace (/\s*(\w+)=.+$/, "$1");
        eraseCookie (cookieName);
    }
}

function listCookies () {
    var cookieList  = document.cookie.split (/;\s*/);

    for (var J = 0, numCookies = cookieList.length;   J < numCookies;  ++J) {
        console.log ("Cookie ", J, ": ", cookieList[J]);
    }
}


function get_config(sitename, allow_cache = true) {
        function addSeconds(numOfSeconds, date = new Date()) {
            date.setSeconds(date.getSeconds() + numOfSeconds);
            return date;
        }

        let sitename_config = JSON.parse(localStorage.getItem('{sitename}_config'.replaceAll('{sitename}',sitename) ));
        let sitename_config_expired_time = parseInt(localStorage.getItem('{sitename}_config_expired_time'.replaceAll('{sitename}',sitename) ));
        let current_timestamp = (new Date()).getTime();

        if ( (sitename_config != null) &&
            (sitename_config_expired_time != null) &&
            (current_timestamp <= sitename_config_expired_time) && 
            (allow_cache == true)  )
        {
            console.log('Use cache Config');
            console.log(sitename_config);
        } else {
            console.log('Get New Config');
            sitename_config = http_get_json('https://ticket.willtechhk.com/{sitename}_config/'.replaceAll('{sitename}',sitename));
            let new_sitename_config_expired_time = addSeconds(2, new Date()).getTime();
            localStorage.setItem('{sitename}_config'.replaceAll('{sitename}',sitename), JSON.stringify(sitename_config));
            localStorage.setItem('{sitename}_config_expired_time'.replaceAll('{sitename}',sitename), new_sitename_config_expired_time.toString());
        }
        return sitename_config;
}



/**
 * Play sound in browser
 * @param array - array of values from -1 to +1 representing sound
 * @param sampleRate - sampling rate to play with, e.g. 44100
 */
function playSound({ array, sampleRate }) {
  // We have to start with creating AudioContext
  const audioContext = new AudioContext({sampleRate});
  // create audio buffer of the same length as our array
  const audioBuffer = audioContext.createBuffer(1, array.length, sampleRate);
  // this copies our sine wave to the audio buffer
  audioBuffer.copyToChannel(array, 0);
  // some JavaScript magic to actually play the sound
  const source = audioContext.createBufferSource();
  source.connect(audioContext.destination);
  source.buffer = audioBuffer;
  source.start();
  console.log('ugh?');
  console.log('playing');
  console.log(array);
}

function playSineWave440hz() {
    const sampleRate = 44100;
    const duration = 3;

    // create a typed array of size 44100 float numbers
    const sineWaveArray = new Float32Array(sampleRate * duration);

    const hz = 440;

    // fill all 44100 elements of array with Math.sin() values
    for (i = 0; i < sineWaveArray.length; i++) {
      sineWaveArray[i] = Math.sin(i * Math.PI * 8 / hz);
    }
    
  playSound({ array: sineWaveArray, sampleRate });
}
