export const getLinePoints = (yLength: number, xLength: number, intercept: number) => {
    const points = [];
    const xMin = -1000;
    const xMax = 1000;
    const slope = yLength / xLength;
    for (let x = xMin; x <= xMax; x++) {
        const y = (x * slope) + intercept;
        points.push({ x, y });
    }
    return points;
}

// export const getLeftVerticalParabola = (vertex: any, foci: any) => {
//     const directrix = Math.sqrt(Math.pow(foci.x - vertex.x, 2) + Math.pow(foci.y - vertex.y, 2));

//     const startX = vertex.x;
//     const endX = vertex.x - 1000;
//     const points = [];
//     for (let x = startX; x >= endX; x--) {
//         let y = (Math.pow(x - vertex.x, 2)) / (4 * directrix);
//         y = y + vertex.y;
//         points.push({ x, y });
//     }
//     return points;
// }

export const getLeftVerticalParabola = (vertex: any, foci: any) => {
    // (y - k)^2 = 4p(x - h)
    const directrix = Math.sqrt(Math.pow(foci.x - vertex.x, 2) + Math.pow(foci.y - vertex.y, 2));

    const startX = vertex.x;
    const endX = vertex.x - 1000;
    const points = [];
    for (let x = startX; x >= endX; x--) {
        const y = vertex.y - Math.sqrt(-4 * directrix * (x - vertex.x));
        points.push({ x, y });
    }
    return points;
}