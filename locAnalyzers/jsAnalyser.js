export const analyzeLines = (lines) => {
    let blank = 0, comments = 0, code = 0;

    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed === "") {
            blank++;
        } else if (trimmed.startsWith("//")) {
            comments++;
        } else {
            code++;
        }
    }

    return {
        blank,
        comments,
        code,
        total: lines.length,
    };
}
