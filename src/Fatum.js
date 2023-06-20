export default class Fatum {
    addGenerators(generators) {
        for (const generatorName of Object.keys(generators)) {
            this.addGenerator(
                generatorName,
                generators[generatorName]
            );
        }
    }

    addGenerator(generatorName, Generator) {
        const generator = new Generator(this);

        this[generatorName] = generator.generate.bind(generator);
    }
}
