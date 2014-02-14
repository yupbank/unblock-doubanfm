chrome.browserAction.setBadgeText({text: ""});


chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
        console.log (details.url);

		if(details.url.match('douban.fm/?$') != null || details.url.match('douban.fm/\\?start*') !=null) {
            return {
                redirectUrl: details.url.replace(/^http:\/\/[^\/]+/,
                        "http://douban.fm/partner/qq_plus")
            };
		}else
            {
            return;
            };

	},
	{
		urls: [
			"http://douban.fm/*"
		]
	},
	["blocking"]
);
