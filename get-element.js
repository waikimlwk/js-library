function get_element_by_xpath(xpath) {
  let result_element = document.evaluate (xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  return result_element;
}


function get_angluarjs_scope(ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
    return angular.element(sel).scope();
}
