export class CounterService {
    activeCounter = 0;
    inactiveCounter = 0;

    countActiveToInactive() {
        this.inactiveCounter += 1;
        console.log(this.inactiveCounter);
    }

    countInactiveToActive() {
        this.activeCounter += 1;
        console.log(this.activeCounter);
    }
}