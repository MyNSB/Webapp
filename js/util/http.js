class HTTP {
    constructor() {
        this.base_url = "http://35.189.50.185:8080/api/v1"
    }
}

HTTP.prototype.get = function(endpoint, paramaters, callbacks) {
    $.get({
        // Check if admin
        url: this.base_url + endpoint,
        async: false,
        xhrFields: {
            withCredentials: true
        },
        data: paramaters,
        success: callbacks["success"],
        error: callbacks["failure"]
    })
}