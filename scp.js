/*
 
This file is part of HankHillBot.

HankHillBot is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

HankHillBot is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with HankHillBot.  If not, see <http://www.gnu.org/licenses/>.

*/

var wikidot = require('wikidot');
var scp-wiki = 'scp-wiki';

wikidot.site = scp-wiki;

function scp(name) {
  if (!(this instanceof scp)) return new scp(name);

  this.technicalName = 'scp-' + name;
  this.rawPage = wikidot.getPage(technicalName);  
  this.title = this.rawPage.title;
  this.rating = this.rawPage.rating;
  this.body = this.rawPage.content;
  this.tags = this.rawPage.tags;
}

function tag(name,inverted = false) {
  if (!(this instanceof tag)) return new tag(name,inverted);

  this.name = name;
  this.inverted = inverted;
}

scp.prototype.find_keyword = function(keyword, case_sensitive = false) {
  var body = this.body;
  if (!case_sensitive) {
    body = body.toLowerCase();
    keyword = keyword.toLowerCase();
  }
  return (this.body.indexOf(keyword) !== -1);
};

scp.prototype.find_mark = function(mark) {
  return this.find_keyword("[[" + mark + "]]");
};

scp.prototype.has_tag = function(tagv) {
  if (!(tagv instanceof tag)) tagv = tag(tagv);

  var tagFound = tag.inverted;
  this.tags.forEach(function(element) {
    if (element === tagv.name)
      tagFound = !tagFound;
  });
  return tagFound;
};

var convertStringsToTags = function(strings) {
  var tags = [];
  strings.forEach(function(string) {
    if (element instanceof tag)
      tags.push(element);
    else
      tags.push(tag(string));
  });
  return tags;
};

exports.scp = scp;
exports.tag = tag;

exports.get_scps_from_tags = function(tags) {
  if (!(tags[0] instanceof tag) tags = convertStringsToTags(tags);
};
