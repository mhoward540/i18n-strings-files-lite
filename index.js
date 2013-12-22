// Generated by CoffeeScript 1.6.3
(function() {
  var Iconv, fs, i18nStringsFiles;

  fs = require('fs');

  Iconv = require('iconv').Iconv;

  i18nStringsFiles = function() {};

  i18nStringsFiles.prototype.readFile = function(file, encoding, callback) {
    var _this = this;
    return fs.readFile(file, function(err, buffer) {
      var data, str;
      if (err) {
        return typeof callback === "function" ? callback(err, null) : void 0;
      }
      str = _this.convertBufferToString(buffer, encoding);
      data = _this.parse(str);
      return typeof callback === "function" ? callback(null, data) : void 0;
    });
  };

  i18nStringsFiles.prototype.readFileSync = function(file, encoding) {
    var buffer, str;
    buffer = fs.readFileSync(file);
    str = this.convertBufferToString(buffer, encoding);
    return this.parse(str);
  };

  i18nStringsFiles.prototype.writeFile = function(file, data, encoding, callback) {
    var buffer, str,
      _this = this;
    str = this.compile(data);
    buffer = this.convertStringToBuffer(str, encoding);
    return fs.writeFile(file, buffer, function(err) {
      return typeof callback === "function" ? callback(err) : void 0;
    });
  };

  i18nStringsFiles.prototype.writeFileSync = function(file, data, encoding) {
    var buffer, str;
    str = this.compile(data);
    buffer = this.convertStringToBuffer(str, encoding);
    return fs.writeFileSync(file, buffer);
  };

  i18nStringsFiles.prototype.convertBufferToString = function(buffer, encoding) {
    var iconv;
    if (!encoding) {
      encoding = 'UTF-16';
    }
    iconv = new Iconv(encoding, 'UTF-8');
    return iconv.convert(buffer).toString('utf8');
  };

  i18nStringsFiles.prototype.convertStringToBuffer = function(str, encoding) {
    var iconv;
    if (!encoding) {
      encoding = 'UTF-16';
    }
    iconv = new Iconv('UTF-8', encoding);
    return iconv.convert(str);
  };

  i18nStringsFiles.prototype.parse = function(input) {
    var lines, reAssign, reLineEnd, result;
    reAssign = /[^\\]" = "/;
    reLineEnd = /";$/;
    result = {};
    lines = input.split("\n");
    lines.forEach(function(line) {
      var msgid, msgstr;
      line = line.trim();
      line = line.replace(/([^\\])("\s*=\s*")/g, "$1\" = \"");
      line = line.replace(/"\s+;/g, '";');
      if (line.substr(0, 1) !== '"' || line.search(reAssign) === -1 || line.search(reLineEnd) === -1) {
        return;
      }
      msgid = line;
      msgid = msgid.substr(1);
      msgid = msgid.substr(0, msgid.search(reAssign) + 1);
      msgstr = line;
      msgstr = msgstr.substr(msgstr.search(reAssign) + 6);
      msgstr = msgstr.substr(0, msgstr.search(reLineEnd));
      msgid = msgid.replace(/\\"/g, "\"");
      msgstr = msgstr.replace(/\\"/g, "\"");
      msgid = msgid.replace(/\\n/g, "\n");
      msgstr = msgstr.replace(/\\n/g, "\n");
      return result[msgid] = msgstr;
    });
    return result;
  };

  i18nStringsFiles.prototype.compile = function(data) {
    var msgid, msgstr, output;
    if (typeof data !== "object") {
      return "";
    }
    output = "";
    for (msgid in data) {
      msgstr = data[msgid];
      msgid = msgid.replace(/"/g, "\\\"");
      msgstr = msgstr.replace(/"/g, "\\\"");
      msgid = msgid.replace(/\n/g, "\\n");
      msgstr = msgstr.replace(/\n/g, "\\n");
      output = output + "\"" + msgid + "\" = \"" + msgstr + "\";\n";
    }
    return output;
  };

  module.exports = new i18nStringsFiles;

}).call(this);
