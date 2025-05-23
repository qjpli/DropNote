export const hexToRgba = (hex: string, alpha: number) => {
    // Remove the "#" if present
    hex = hex.replace('#', '');

    // Convert shorthand hex (e.g., #abc) to full form (e.g., #aabbcc)
    if (hex.length === 3) {
        hex = hex.split('').map((char) => char + char).join('');
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
