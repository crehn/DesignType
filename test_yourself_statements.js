var prefix = "you";
var statements = {}
statements.simple = [
	"Software should be simple in order to be fast to write, maintainable, and low on bugs.",
	"Avoid dependencies, libraries and complex language features that do not have a substantial advantage.",
	"Don't implement features/flexibility/configurability unless there is a good reason to do so.",
	"A class/method is good when it's small. Large units/modules are a smell.",
	"Simple brute-force solutions may be slow but will work in the first place.",
	"Good code needs almost no documentation."
];
statements.powerful = [
	"Investing a bit more time to solve a problem in a generic way, saves time in the long run.",
	"Performance, scalability, portability, etc. have to be considered before and during implementation.",
	"Make your software extensible, flexible and configurable at runtime so you don't have to change your code continuously.",
	"Make yourself independent from external systems. Use an abstraction layer to do so.",
	"Generics, exceptions, polymorphism, closures, operator overloading, aspect-orientation, reflection, etc. are powerful instruments that bring up a valuable benefit.",
	"Code generators, DSLs, build profiles and configurable libraries can lift you to a higher level of effectiveness."
];
statements.abstract = [
    "Don't look at the code with a magnifying glass. Rather think in terms of abstractions, concepts and models.",
    "Establish architectural constraints and check them. Software should be cleanly structured.",
    "Each class should represent a real-world concept.",
    "To document software means to explain the concepts, layers and dependencies.",
    "Also &quot;small&quot; concepts like <code>Birthday</code>, <code>CustomerNumber</code>, and <code>EmailAddress</code> should be represented by a class.",
    "Each change/refactoring has to be done with the big picture in mind. Every functionality has its place, every layer its purpose."
];
statements.concrete = [
    "Programming is about writing code, not about drawing pictures.",
    "Coding is the repetition of writing code and extracting redundancy.",
    "Software is like bushes or hedgerows. It naturally grows in several directions and needs to be trimmed every now and then.",
    "To document software means to explain the classes and methods.",
    "The best way to understand software is to read the code.",
    "You can refactor code without completely understanding it."
];
statements.pragmatic = [
    "Software is an instrument to achieve a certain goal e.g. satisfy business needs, automate processes, etc.",
    "An 80% solution now is often better than a 100% solution next month.",
    "Only necessary things have to be implemented. Technical completeness and symmetry have no value on their own.",
    "Not every task needs a fancy framework or special programming language feature to be accomplished.",
    "Sometimes it is necessary to omit certain time consuming tasks like unit tests, consistent exception handling or documentation.",
    "It's not a shame to use code snippets you find on the Internet. They can be extremely helpful and boost development speed."
];
statements.idealistic = [
    "Bad quality will kill you in the long run.",
    "Each piece of functionality has its place where it belongs. It should be implemented exactly there.",
    "Don't misuse programming language constructs. Don't misuse frameworks, patterns and concepts (e.g. don't say REST when it's actually not).",
    "Good design combines precise structure with symmetry.",
    "Duplication is the root of all evil. Avoid it.",
    "Good identifiers are important. If there is no good identifier, it is a sign that the abstraction is wrong."
];
statements.robust = [
    "Never change a running system.",
    "Strive towards standardization: Use standard technologies, standard architectures, standard coding styles, standard formatting, standardized checklists, etc.",
    "Use stable technology which stood the test of time. Buggy libraries are annoying and new technologies are often just hyped.",
    "Better write a few more lines of code instead of adding a dependency to another new library.",
    "Defensive programming is an essential part of writing code.",
    "Avoid code magic like bytecode manipulation, reflection and aspect orientation."
];
statements.technologic = [
    "Technology evolves. We should do so, too.",
    "Move fast and don't fear breaking things.",
    "Upgrading technology regularly is easy as it's always a small step. Waiting for too long makes upgrading hard and painful when it becomes unavoidable.",
    "Try out new frameworks, libraries, design strategies, and languages. Even if you won't use it in practice, it's good to broaden your horizon.",
    "It is absolutely normal that a coding style changes over time. This just reflects that developers are able to learn something new.",
    "New programming language constructs like generics, annotations, lambdas, etc. are there for a certain reason and should be used in this case."
];
