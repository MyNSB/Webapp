class Period {
    constructor(json) {
        this.class = json["class"];
        this.day = json["day"];
        this.period = json["period"];
        this.room = json["room"];
        this.teacher = json["teacher"];
    }
}

module.exports = Period;