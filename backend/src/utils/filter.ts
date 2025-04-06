export function isEducationalQuestion(question: string): boolean {
    const keywords = [
        "университет", "курс", "экзамен", "школа", 
        "предмет", "лекция", "семинар", "наука"
    ];

    return keywords.some(word => question.toLowerCase().includes(word));
}
