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
            if (document.evaluate (xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)) {
                return resolve(document.evaluate (xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null));
            }

            const observer = new MutationObserver(mutations => {
                if (document.evaluate (xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)) {
                    resolve(document.evaluate (xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
