
function formatParams(data) {
      function getInstanceof(obj, typeStr) {
        var objStr = Object.prototype.toString.call(obj).toLowerCase();
        if (!typeStr) {
          return objStr.match(/^\[object\s(\w+)\]$/)[1];
        } else {
          var reg = new RegExp("^\\[object " + typeStr + "\\]$");
          return reg.test(objStr);
        }
      };
      var arr = [];
      function depthParams(_data, _name) {
        if (getInstanceof(_data, 'array')) {
          _data.forEach(function (item) {
            depthParams(item, _name + '[]');
          });
        } else if (getInstanceof(_data, 'object')) {
          for (var n in _data) {
            depthParams(_data[n], _name + '[' + n + ']');
          }
        } else {
          arr.push(encodeURIComponent(_name) + "=" + encodeURIComponent(_data));
        }
      } 
      for (var name in data) {
        depthParams(data[name], name);
      } 
      arr.push(("v=" + Math.random()).replace(".", ""));    
      return arr.join("&");
}
window.SocketUrl = '';
window.HttpUrl ='';
 window.ajax =  function ajax (options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    options.timeout = options.timeout||10000;
    var params = formatParams(options.data);
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else { 
      var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
        xhr.timeout = options.timeout;
        xhr.onreadystatechange = function () {
                  if (xhr.readyState == 4) {
                    var status = xhr.status;
                    if (status >= 200 && status < 300) {
                      options.success && options.success(xhr.responseText, xhr.responseXML);
                    } else {
                      options.fail && options.fail(status);
                    }
                  }
        }
                if (options.type == "GET") {
                  xhr.open("GET", options.url + "?" + params, true);
                  xhr.send(null);
                } else if (options.type == "POST") {
                  xhr.open("POST", options.url, true);
                  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                  xhr.send(params);
                }
      }
