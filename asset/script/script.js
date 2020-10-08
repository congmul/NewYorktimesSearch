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
    displayArticlesEl.empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var docsArr = response.response.docs;
        console.log(docsArr);
        console.log(docsArr[0].headline.main);

        for (let i = 0; i < numberRecoredsEl; i++){
            var headline = docsArr[i].headline.main;
            var webURL = docsArr[i].web_url;
            var pubDate = docsArr[i].pub_date;
            pubDate.slice(0,10);
            
            var divEl = $("<div>");
            var aEl = $("<a>");
            var pHeadlineEl = $("<p>");
            var pByLineEl = $("<p>");
            var pSectionNameEl = $("<p>");
            var pDate = $("<p>");
            var pArticle = $("<p>");

            divEl.attr("class", "articleLists");

            aEl.text(webURL);
            aEl.attr("href", webURL);
            aEl.attr("target", "_blank");
            

            var headline = docsArr[i].headline.main;
            pHeadlineEl.text((parseInt(i)+ 1) +". " + headline);
            pByLineEl.text(docsArr[i].byline.original);
            pSectionNameEl.text("Section: " + docsArr[i].section_name);
            pDate.text(pubDate.slice(0,10));
            pArticle.text(docsArr[i].abstract);

            divEl.append(pHeadlineEl);
            divEl.append(pByLineEl);
            divEl.append(pSectionNameEl);
            divEl.append(pDate);
            divEl.append(pArticle);
            divEl.append(aEl);

            displayArticlesEl.append(divEl);
        }
        
    });

});



// + "&facet_fields=source&facet=true"  ** Need to study facet more.