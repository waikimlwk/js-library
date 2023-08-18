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


async function http_get_json_async(url) {
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let data = await response.json();
    return data;
}

async function get_internal_ip() {
    let internal_ip = '0.0.0.0';
    try{
        let message_obj = await http_get_json_async('https://127.0.0.1:8080');
        internal_ip = message_obj['internal_ip'];
    }
    catch(error) {

    }
    return internal_ip;
    
}



function http_post_json(url, json_object) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest(); // new HttpRequest instance
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onload = function() {
            if (request.status === 200) {
                resolve(request.responseText);
            } else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function() {
            reject(Error("Network Error"));
        };
        request.send(JSON.stringify(json_object));
    });
}


function get_elements_by_xpath(xpath) {
    let result = [];
    let nodesSnapshot = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    for ( let i=0 ; i < nodesSnapshot.snapshotLength; i++ ){
        result.push(nodesSnapshot.snapshotItem(i));
    }
    return result;
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

async function waitForXpathNode(xpath, timeout = 3000) {
    const startTime = Date.now();
    while (true) {
        let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            return element;
        }
        if (Date.now() - startTime > timeout) {
            return null; // Timeout reached, return null
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
            let new_sitename_config_expired_time = addSeconds(5, new Date()).getTime();
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


function load_or_fetch_script_and_execute(script_url, expirationTime) {
  return new Promise((resolve) => {
    const script_name = script_url.substring(script_url.lastIndexOf('/') + 1);
    const script_name_key = script_name + '-name';
    const script_savetime_key = script_name + '-saved';

    const savedJsCode = localStorage.getItem(script_name_key);
    const savedTimestamp = localStorage.getItem(script_savetime_key);

    const currentTime = Date.now();

    if (savedJsCode && savedTimestamp && currentTime - savedTimestamp < expirationTime) {
      executeJsCode(savedJsCode, resolve);
    } else {
      GM_xmlhttpRequest({
        method: 'GET',
        url: script_url,
        onload: function (response) {
          const newScriptContent = response.responseText;
          localStorage.setItem(script_name_key, newScriptContent);
          localStorage.setItem(script_savetime_key, currentTime);

          executeJsCode(newScriptContent, resolve);
        },
      });
    }
  });
}


function executeJsCode(jsCode, resolve) {
  const scriptElement = document.createElement('script');
  const blob = new Blob([jsCode], { type: 'text/javascript' });
  const scriptURL = URL.createObjectURL(blob);

  scriptElement.src = scriptURL;
  scriptElement.onload = function () {
    URL.revokeObjectURL(scriptURL); // Clean up the created URL after the script is loaded
    resolve(); // Resolve the Promise when the script has finished loading
  };

  document.body.appendChild(scriptElement);
}




    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }

    async function get_recaptcha_audio_answer(mp3_base64, speech_url) {
        //let recaptcha_audio_solver_link = 'https://test01.cpii.hk/recaptcha/audio/solve/';
        let recaptcha_audio_solver_link = 'https://captcha.willtechhk.com/gee_audio_solver/';
        let solver_request_object = {"speech_data_base64": mp3_base64, "speech_url": speech_url};

        let response = await fetch(recaptcha_audio_solver_link, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(solver_request_object)
        });

        if (!response.ok) {
            console.error('HTTP error, status = ' + response.status);
        } else {
            let data = await response.text();
            console.log(data);
            return data;
        }
    }


    async function update_machine_status(hostname, internal_ip, status) {
        const url = 'https://ticket.willtechhk.com/machine_status/'; // Replace with your server endpoint

        const data = {
            hostname: hostname,
            internal_ip: internal_ip,
            status: status
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();
        return result;
    }



const event_mouseover = new MouseEvent('mouseover', {
    view: window,
    bubbles: true,
    cancelable: true
});

const event_mousedown = new MouseEvent('mousedown', {
    view: window,
    bubbles: true,
    cancelable: true
});

const event_mouseup = new MouseEvent('mouseup', {
    view: window,
    bubbles: true,
    cancelable: true
});

const event_click = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
});




