var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'elasticsearch:9200',
    log: 'info'
});

var index = "logs";
var defaultAmount = 10;
var defaultPage = 1;

function initialize() {
    return elasticClient.indices.putMapping({
        index: index,
        type: "entry",
        body: {}
    });
}
exports.initialize = initialize;

function indexExists() {
    return elasticClient.indices.exists({
        index: index
    });
}
exports.indexExists = indexExists;

function createIndex() {
    return elasticClient.indices.create({
        index: index
    });
}
exports.createIndex = createIndex;

function addLog(log, ip, hostname) {
    var timeStamp = new Date().toString();
    return elasticClient.index({
        index: index,
        type: "entry",
        body: {
            timestamp: timeStamp,
            ipAddress: ip,
            hostname: hostname, 
            data: log
        }
    });
}
exports.addLog = addLog;

function getLogs(query, p, a) {

    var wildcard =  {
                        query: {
                            match_all: {}
                        }
                    };

    var matchQuery =    {
                            query: {
                                match: {
                                    _all: query
                                }
                            }
                        };

    var page = p || defaultPage;
    var amount = a || defaultAmount;
    var body = query ? matchQuery : wildcard;
    console.log(query);
    return elasticClient.search({
        index: index,
        from: (page - 1) * amount,
        size: amount,        
        body: body
    })
}

exports.getLogs = getLogs;
