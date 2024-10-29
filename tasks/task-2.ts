interface Car {
    name: string,
    engine: Engine;
    wheels: Wheel;
    lights: Lights;
    updateStatus(): void;
}

interface Engine {
    status: 'Запущен' | 'Остановлен';
    fuelLevel: number;
    start: () => void;
    stop: () => void;
    checkStatus: () => void;
}

interface Wheel {
    pressure: number;
    checkPressure: () => void;
    changePressure: (pressure: number) => void
}

interface Lights {
    headlights: boolean;
    turnSignals: boolean;
    switchHeadlights: () => void;
    switchTurnSignals: () => void;
    checkLights: () => void
}

const createEngine = (): Engine => {
    return {
        status: 'Запущен',
        fuelLevel: 50,
        start() {
            this.status = 'Запущен';
            console.log("Двигатель запущен.");
        },
        stop() {
            this.status = 'Остановлен';
            console.log("Двигатель остановлен.");
        },
        checkStatus() {
            console.log(`Статус двигателя: ${this.status}, уровень топлива: ${this.fuelLevel}%`);
        }
    };
}

const createWheels = (): Wheel => {
    return {
        pressure: 20,
        checkPressure() {
            console.log(`Давление в шинах: ${this.pressure} PSI`);
        },
        changePressure(pressure) {
            this.pressure = pressure;
            console.log(`Давление в шинах после изменения: ${pressure}`)
        }
    };
}

const createLights = (): Lights => {
    return {
        headlights: false,
        turnSignals: false,
        switchHeadlights() {
            this.headlights = !this.headlights;
        },
        switchTurnSignals() {
            this.turnSignals = !this.turnSignals;
        },
        checkLights() {
            console.log(`Фары ${this.headlights ? 'включены' : 'выключены'}.`);
            console.log(`Поворотники ${this.turnSignals ? 'включены' : 'выключены'}.`);
        }
    };
}

const createCar = (name: string): Car => {
    const engine = createEngine();
    const wheels = createWheels()
    const lights = createLights();

    return {
        engine,
        wheels,
        lights,
        name,
        updateStatus() {
            console.log("Обновление состояния автомобиля...");
            console.log(`Марка автомобиля: ${this.name}`)
            this.engine.checkStatus();
            this.wheels.checkPressure();
            this.lights.checkLights();
        }
    };
}

const car = createCar('Volvo');
car.engine.start();
car.lights.switchHeadlights();
console.log('============================');
car.updateStatus();
car.wheels.changePressure(50);
console.log('============================');
car.updateStatus();
car.lights.switchTurnSignals();
car.engine.stop();
car.lights.switchTurnSignals();
console.log('============================');
car.updateStatus();