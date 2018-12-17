class Event {
    constructor(name, start, end, location, shortDesc, longDesc, organiser = "", imageURL = "") {
        this.name = name;
        this.organiser = organiser;
        this.start = start;
        this.end = end;
        this.location = location;
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
        this.imageURL = imageURL;
    }
}