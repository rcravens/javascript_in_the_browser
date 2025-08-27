export class RemoveSymbolEvent extends Event {
    static event_name = 'remove_symbol';

    constructor(symbol) {
        super(RemoveSymbolEvent.event_name, {bubbles: true});

        this.symbol = symbol;
    }
}