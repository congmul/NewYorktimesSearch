$("#search").on("click", function (e) {
    e.preventDefault();
    var searchTermEl = $("#searchTerm").val();
    var numberRecoredsEl = $("#numberRecoreds").val();
    var startYearEl = $("#startYear").val();
    var endYearEl = $("#endYear").val();

    var query = searchTermEl;
    var apiKey = "OlaWmj1JChL9pjVY4mnxz3vHJBdPAQsF";
    var starYearURL = "&begin_date="+startYearEl+"0101";
    var endYearURL = "&end_date="+endYearEl+"1231";

    if(startYearEl === "" || endYearEl === ""){
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + "&page="+ numberRecoredsEl +"&api-key=" + apiKey;
    }else{
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + query + starYearURL+endYearURL+"&page="+ numberRecoredsEl +"&api-key=" + apiKey;
    }
    
    displayArticlesEl = $("#displayArticles");
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var docsArr = response.response.docs;
        console.log(docsArr);
        console.log(docsArr[0].headline.main);

        for (let i = 0; i < docsArr.length; i++){
            var headline = docsArr[i].headline.main;
            var webURL = docsArr[i].web_url;
            var pubDate = docsArr[i].pub_date;
            pubDate.slice(0,10);
            
            var aEl = $("<a>");
            var divEl = $("<div>");
            
            aEl.attr("href", webURL);
            aEl.attr("target", "_blank");
            divEl.attr("class", "articleLists");

            var headline = docsArr[i].headline.main;
            divEl.text(pubDate.slice(0,10)+" : "+headline);

            aEl.append(divEl);
            displayArticlesEl.prepend(aEl);
        }
        
    });

});



// + "&facet_fields=source&facet=true"  ** Need to study facet more.