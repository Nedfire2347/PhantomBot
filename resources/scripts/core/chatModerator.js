(function(){var e=[],r=[],a=[],t=[],s=[],i=$.inidb.exists("chatModerator","linksToggle")?$.getIniDbBoolean("chatModerator","linksToggle"):true,o=$.inidb.exists("chatModerator","linksMessage")?$.inidb.get("chatModerator","linksMessage"):"you were timed out for linking",n=parseInt($.inidb.exists("chatModerator","linkPermitTime"))?parseInt($.getIniDbBoolean("chatModerator","linkPermitTime")):120,g=$.inidb.exists("chatModerator","capsToggle")?$.getIniDbBoolean("chatModerator","capsToggle"):true,l=$.inidb.exists("chatModerator","capsMessage")?$.inidb.get("chatModerator","capsMessage"):"you were timed out for overusing caps",d=parseInt($.inidb.exists("chatModerator","capsLimit"))?parseInt($.getIniDbBoolean("chatModerator","capsLimit")):50,h=parseInt($.inidb.exists("chatModerator","capsTriggerLength"))?parseInt($.getIniDbBoolean("chatModerator","capsTriggerLength")):5,m=$.inidb.exists("chatModerator","spamToggle")?$.getIniDbBoolean("chatModerator","spamToggle"):true,u=$.inidb.exists("chatModerator","spamMessage")?$.inidb.get("chatModerator","spamMessage"):"you were timed out for spamming",c=parseInt($.inidb.exists("chatModerator","spamLimit"))?parseInt($.getIniDbBoolean("chatModerator","spamLimit")):25,f=$.inidb.exists("chatModerator","symbolsToggle")?$.getIniDbBoolean("chatModerator","symbolsToggle"):true,p=$.inidb.exists("chatModerator","symbolsMessage")?$.inidb.get("chatModerator","symbolsMessage"):"you were timed out for overusing symbols",b=parseInt($.inidb.exists("chatModerator","symbolsLimit"))?parseInt($.getIniDbBoolean("chatModerator","symbolsLimit")):25,y=parseInt($.inidb.exists("chatModerator","symbolsTriggerLength"))?parseInt($.getIniDbBoolean("chatModerator","symbolsTriggerLength")):5,w=$.inidb.exists("chatModerator","regularsToggle")?$.getIniDbBoolean("chatModerator","regularsToggle"):false,x=$.inidb.exists("chatModerator","subscribersToggle")?$.getIniDbBoolean("chatModerator","subscribersToggle"):true,I=$.inidb.exists("chatModerator","blacklistMessage")?$.inidb.get("chatModerator","blacklistMessage"):"you were timed out using a blacklisted phrase",M=parseInt($.inidb.exists("chatModerator","warningTime"))?parseInt($.getIniDbBoolean("chatModerator","warningTime")):5,P=parseInt($.inidb.exists("chatModerator","timeoutTime"))?parseInt($.getIniDbBoolean("chatModerator","timeoutTime")):600,C="";function T(){var e=$.inidb.GetKeyList("blacklist","");for(var r in e){s.push($.inidb.get("blacklist",e[r]))}}function k(){var e=$.inidb.GetKeyList("whitelist","");for(var r in e){t.push($.inidb.get("whitelist",e[r]))}}function q(e,r){$.say(".timeout "+e+" "+r);setTimeout(function(){$.say(".timeout "+e+" "+r)},1e3)}function L(e){for(var a in r){if(r[a].equalsIgnoreCase(e)){q(e,P);D(e);C="(timeout)";return}}q(e,M);D(e);C="(warning)"}function v(e,r){if(a.length<=1){$.say("@"+$.username.resolve(e)+", "+r+" "+C)}}function D(e){r.push(e);a.push($.systemTime());B(e)}function B(e){var t=setTimeout(function(){a.splice(0);clearTimeout(t)},15*1e3);var s=setTimeout(function(){for(var a in r){if(r[a].equalsIgnoreCase(e)){r.splice(a,0);break}}clearTimeout(s)},60*60*1e3)}function _(r){e.push(r);var a=setTimeout(function(){for(var t in e){if(e[t].equalsIgnoreCase(r)){e.splice(t,1);break}}clearTimeout(a)},n*1e3)}function j(e){return e?$.lang.get("common.enabled"):$.lang.get("common.disabled")}function A(r){for(var a in e){if(e[a].equalsIgnoreCase(r)){e.splice(a,1);return}}}$.bind("ircChannelMessage",function(e){var r=e.getSender(),a=e.getMessage();if(!$.isModv3(r,e.getTags())&&(x||!$.isSubv3(r,e.getTags()))){for(var n in s){if(a.contains(s[n])){q(r,P);v(r,I);return}}if(A(r)){return}if(i&&$.patternDetector.hasLinks(e)){for(n in t){if(a.contains(t[n])){return}}if(w&&$.getUserGroupId(r)<=6){return}L(r);v(r,o);return}if(g&&a.length()>h){if(e.getCapsCount()>d){L(r);v(r,l);return}}if(f&&a.length()>y){if($.patternDetector.getNumberOfNonLetters(e)>b){L(r);v(r,p);return}}if(m){if($.patternDetector.getLongestRepeatedSequence(e)>c){L(r);v(r,u)}}}});$.bind("command",function(e){var r=e.getSender(),a=e.getCommand(),C=e.getArguments(),q=e.getArgs(),L=q[0],v=q[1];if(a.equalsIgnoreCase("permit")){if(!$.isModv3(r,e.getTags())){$.say($.whisperPrefix(r)+$.modMsg);return}else if(!L){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.permit.usage"));return}_(L);$.say($.username.resolve(L)+$.lang.get("chatmoderator.permited",n));return}if(a.equalsIgnoreCase("blacklist")){if(!$.isAdmin(r)){$.say($.whisperPrefix(r)+$.adminMsg);return}if(!L){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.usage"));return}if(L.equalsIgnoreCase("add")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.add.usage"));return}var D=C.replace(L,"").trim();$.inidb.set("blackList","phrase_"+s.length,D);s.push(D);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.added"));return}if(L.equalsIgnoreCase("remove")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.remove.usage"));return}else if(!$.inidb.exists("blackList","phrase_"+parseInt(v))){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.err"));return}$.inidb.del("blackList","phrase_"+parseInt(v));T();$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.removed"))}if(L.equalsIgnoreCase("show")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.show.usage"));return}else if(!$.inidb.exists("blackList","phrase_"+parseInt(v))){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.err"));return}$.say($.whisperPrefix(r)+$.inidb.get("blackList","phrase_"+parseInt(v)));return}}if(a.equalsIgnoreCase("whiteList")){if(!$.isAdmin(r)){$.say($.whisperPrefix(r)+$.adminMsg);return}if(!L){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.usage"));return}if(L.equalsIgnoreCase("add")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.add.usage"));return}var B=C.replace(L,"").trim();$.inidb.set("whiteList","link_"+t.length,B);t.push(B);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.link.added"));return}if(L.equalsIgnoreCase("remove")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.remove.usage"));return}else if(!$.inidb.exists("whiteList","link_"+parseInt(v))){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.err"));return}$.inidb.del("whiteList","link_"+parseInt(v));k();$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.removed"));return}if(L.equalsIgnoreCase("show")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.whitelist.show.usage"));return}if(!$.inidb.exists("whiteList","link_"+parseInt(v))){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.err"));return}$.say($.whisperPrefix(r)+$.inidb.get("whiteList","link_"+parseInt(v)));return}}if(a.equalsIgnoreCase("moderation")||a.equalsIgnoreCase("mod")){if(!$.isAdmin(r)){$.say($.whisperPrefix(r)+$.adminMsg);return}if(!L){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.usage.toggles"));$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.usage.messages"));$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.options"));return}if(L.equalsIgnoreCase("links")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.link.usage",j(i)));return}if(v.equalsIgnoreCase("on")){i=true;$.inidb.set("chatModerator","linksToggle",i);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.link.filter.enabled"));return}else if(v.equalsIgnoreCase("off")){i=false;$.inidb.set("chatModerator","linksToggle",i);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.link.filter.disabled"));return}}if(L.equalsIgnoreCase("caps")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.usage",j(g)));return}if(v.equalsIgnoreCase("on")){g=true;$.inidb.set("chatModerator","capsToggle",g);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.filter.enabled"));return}else if(v.equalsIgnoreCase("off")){g=false;$.inidb.set("chatModerator","capsToggle",g);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.filter.disabled"));return}}if(L.equalsIgnoreCase("spam")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.usage",j(m)));return}if(v.equalsIgnoreCase("on")){m=true;$.inidb.set("chatModerator","spamToggle",m);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.filter.enabled"));return}else if(v.equalsIgnoreCase("off")){m=false;$.inidb.set("chatModerator","spamToggle",m);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.filter.disabled"));return}}if(L.equalsIgnoreCase("symbols")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.usage",j(f)));return}if(v.equalsIgnoreCase("on")){f=true;$.inidb.set("chatModerator","symbolsToggle",f);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.filter.enabled"));return}else if(v.equalsIgnoreCase("off")){f=false;$.inidb.set("chatModerator","symbolsToggle",f);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.filter.disabled"));return}}if(L.equalsIgnoreCase("regulars")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.regulars.usage"));return}if(v.equalsIgnoreCase("true")){w=true;$.inidb.set("chatModerator","regularsToggle",w);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.regulars.enabled"));return}else if(v.equalsIgnoreCase("false")){w=false;$.inidb.set("chatModerator","regularsToggle",w);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.regulars.disabled"));return}}if(L.equalsIgnoreCase("subscribers")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.subscribers.usage"));return}if(v.equalsIgnoreCase("true")){x=true;$.inidb.set("chatModerator","subscribersToggle",x);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.subscribers.enabled"));return}else if(v.equalsIgnoreCase("false")){x=false;$.inidb.set("chatModerator","subscribersToggle",x);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.subscribers.disabled"));return}}if(L.equalsIgnoreCase("linksmessage")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.link.message.usage"));return}o=C.replace(L,"").trim();$.inidb.set("chatModerator","linksMessage",o);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.link.message.set",o));return}if(L.equalsIgnoreCase("capsmessage")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.message.usage"));return}l=C.replace(L,"").trim();$.inidb.set("chatModerator","capsMessage",l);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.message.set",l));return}if(L.equalsIgnoreCase("symbolsmessage")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.message.usage"));return}p=C.replace(L,"").trim();$.inidb.set("chatModerator","symbolsMessage",p);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.message.set",p));return}if(L.equalsIgnoreCase("spammessage")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.message.usage"));return}u=C.replace(L,"").trim();$.inidb.set("chatModerator","spamMessage",u);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.message.set",u));return}if(L.equalsIgnoreCase("blacklistmessage")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.message.usage"));return}I=C.replace(L,"").trim();$.inidb.set("chatModerator","blacklistMessage",I);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.blacklist.message.set",I));return}if(L.equalsIgnoreCase("permittime")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.permit.time.usage"));return}n=parseInt(v);$.inidb.set("chatModerator","linkPermitTime",n);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.permit.time.set",n));return}if(L.equalsIgnoreCase("capslimit")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.limit.usage"));return}d=parseInt(v);$.inidb.set("chatModerator","capsLimit",d);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.limit.set",d));return}if(L.equalsIgnoreCase("capstriggerlength")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.trigger.length.usage"));return}h=parseInt(v);$.inidb.set("chatModerator","capsTriggerLength",h);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.caps.trigger.length.set",d));return}if(L.equalsIgnoreCase("spamlimit")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.limit.usage"));return}c=parseInt(v);$.inidb.set("chatModerator","spamLimit",c);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.spam.limit.set",c));return}if(L.equalsIgnoreCase("symbolslimit")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.limit.usage"));return}b=parseInt(v);$.inidb.set("chatModerator","symbolsLimit",b);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.limit.set",b));return}if(L.equalsIgnoreCase("symbolsTriggerLength")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.trigger.length.usage"));return}y=parseInt(v);$.inidb.set("chatModerator","symbolsTriggerLength",y);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.symbols.trigger.length.set",y));return}if(L.equalsIgnoreCase("timeoutime")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.timeout.time.usage"));return}P=parseInt(v);$.inidb.set("chatModerator","timeoutTime",P);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.timeout.time.set",P));return}if(L.equalsIgnoreCase("warningtime")){if(!v){$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.warning.time.usage"));return}M=parseInt(v);$.inidb.set("chatModerator","warningTime",M);$.say($.whisperPrefix(r)+$.lang.get("chatmoderator.warning.time.set",M))}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./core/chatmoderator.js")){$.registerChatCommand("./core/chatmoderator.js","permit",1);$.registerChatCommand("./core/chatmoderator.js","moderation",1);$.registerChatCommand("./core/chatmoderator.js","mod",1);$.registerChatCommand("./core/chatmoderator.js","blacklist",1);$.registerChatCommand("./core/chatmoderator.js","whitelist",1);k();T()}});$.timeoutUser=q;$.permitUserLink=_})();
