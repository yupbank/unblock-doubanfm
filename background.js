chrome.browserAction.setBadgeText({text: ""});

if(localStorage['auto_detect'] == undefined) {
	localStorage['auto_detect'] = 1;
}

function autoDetect() {
	if(localStorage['auto_detect'] != 0) {
        var url = 'http://douban.fm'
        var myRequest = new XMLHttpRequest();
        myRequest.open("GET", url, true); 
        myRequest.onreadystatechange = function(){
         if(myRequest.readyState == 4 && myRequest.status == 200){
            if(myRequest.responseText != null)
                {
                 data = myRequest.responseText;//server response may not yet arrive
                    if(data.search(/id="copyright-pic"/) != -1) {
                        localStorage['in_mainland'] = 0;
                    } else {
                        localStorage['in_mainland'] = 1;
                    }
                }
            else{
                 return 
           }
        }
	};
        myRequest.send(null);
		return;
}
}

autoDetect();

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
        console.log (details.url);
        if(localStorage['in_mainland']==1)
        {
            return;
        }
		
        if(details.url.match('douban.fm/?$') != null || details.url.match('douban.fm/\\?start*') !=null) {
            return {
                redirectUrl: details.url.replace(/^http:\/\/[^\/]+/,
                        "http://douban.fm/partner/qq_plus")
            };
		}	
    },
	{
		urls: [
			"http://douban.fm/*"
		]
	},
	["blocking"]
);
