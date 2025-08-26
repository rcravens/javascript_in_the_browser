export class TripRecorder {
    #watch_id = null;
    #pts = [];
    #min_accuracy_in_miles;
    #min_distance_in_miles;
    #on_new_point_callback;

    constructor(min_accuracy_in_miles, min_distance_in_miles, on_new_point_callback) {
        this.#min_accuracy_in_miles = min_accuracy_in_miles ?? 0.25;
        this.#min_distance_in_miles = min_distance_in_miles ?? 0.1;
        this.#on_new_point_callback = on_new_point_callback ?? null;
    }

    start() {
        if (this.#watch_id !== null) {
            return;
        }
        const options = {
            timeout: 60 * 1000,
            maximumAge: 1000,
            enableHighAccuracy: true
        }

        this.#pts = [];
        this.#watch_id = navigator.geolocation.watchPosition(
            (position) => this.#process_location(position),
            (error) => this.#location_error(error),
            options)
    }

    stop() {
        if (this.#watch_id !== null) {
            navigator.geolocation.clearWatch(this.#watch_id);
            this.#watch_id = null;
        }
    }

    points() {
        return this.#pts;
    }

    last_position() {
        return this.#pts.at(-1) ?? null;
    }

    #process_location(position) {
        // ignore inaccurate data
        const accuracy_in_miles = position.coords.accuracy / 609.344;
        if (accuracy_in_miles > this.#min_accuracy_in_miles) {
            return;
        }

        const cur_pos = {
            timestamp: position.timestamp,
            lat: this.#randomize_position(position.coords.latitude),
            lng: this.#randomize_position(position.coords.longitude),
            distance: 0,
        }
        cur_pos.url = `https://www.google.com/maps/@${cur_pos.lat},${cur_pos.lng},15z`


        const last_pos = this.last_position();

        // only record movement
        if (last_pos) {
            cur_pos.distance = this.#distance_in_miles(cur_pos, last_pos);
            if (cur_pos.distance < this.#min_distance_in_miles) {
                return;
            }
        }

        this.#pts.push(cur_pos);

        if (this.#on_new_point_callback) {
            this.#on_new_point_callback(cur_pos);
        }
    }

    #location_error(err) {
        console.log(err);
    }

    #distance_in_miles(cur_pos, last_pos) {
        const radius = 3956.0; // miles

        const delta_lat = (cur_pos.lat - last_pos.lat) * Math.PI / 180;
        const delta_lng = (cur_pos.lng - last_pos.lng) * Math.PI / 180;
        const sin_lat = Math.sin(0.5 * delta_lat);
        const sin_lng = Math.sin(0.5 * delta_lng);
        const cos_lat1 = Math.cos(last_pos.lat * Math.PI / 180);
        const cos_lat2 = Math.cos(cur_pos.lat * Math.PI / 180);
        const a = sin_lat * sin_lat + cos_lat1 * cos_lat2 * sin_lng * sin_lng;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return radius * c;
    }

    #randomize_position(coordinate) {
        const max_offset = 2
        const degree_offset = (Math.random() * 2 - 1) * max_offset;
        return coordinate + degree_offset;
    }
}