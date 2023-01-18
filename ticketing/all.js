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

    // todo: xpath not work
    function waitForElm_xpath(xpath) {
        return new Promise(resolve => {
            let element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                return resolve(element);
            }

            const observer = new MutationObserver(mutations => {
                if (element) {
                    resolve(element);
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
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


