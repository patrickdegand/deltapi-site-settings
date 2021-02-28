var savedpageJSON = {};
var savedpageObj = {};
var editorPagehead;
var showamp = false;
String.prototype.fakeReplace=function(str, newstr) {
    return this.split(str).join(newstr);
};
function url2path(url) {
path=url.fakeReplace('file:///','');
return path;
}