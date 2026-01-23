import { useEffect, useState } from "react";

const themes = [
    { id: "default", name: "Default (Yellow)", color: "#e7d393" },
    { id: "blue", name: "Blue", color: "#3b82f6" },
    { id: "turquoise", name: "Turquoise", color: "#3ed9c9" },
    { id: "mint", name: "Mint", color: "#98FF98" },
    { id: "rose", name: "Rose", color: "#fe0d6f" },
];

const ThemeSwitcher = () => {
    const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

    useEffect(() => {
        const savedThemeId = localStorage.getItem("theme");
        if (savedThemeId) {
            const index = themes.findIndex((t) => t.id === savedThemeId);
            if (index !== -1) {
                setCurrentThemeIndex(index);
                document.documentElement.setAttribute("data-theme", savedThemeId);
            }
        }
    }, []);

    const cycleTheme = () => {
        const nextIndex = (currentThemeIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];

        setCurrentThemeIndex(nextIndex);
        document.documentElement.setAttribute("data-theme", nextTheme.id);
        localStorage.setItem("theme", nextTheme.id);
    };

    const currentTheme = themes[currentThemeIndex];

    return (
        <button
            onClick={cycleTheme}
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 p-3 bg-white/90 backdrop-blur-sm text-black rounded-full shadow-lg font-bold hover:bg-white transition-all cursor-pointer border-2 border-transparent hover:border-black/10"
            aria-label={`Current theme: ${currentTheme.name}. Click to change.`}
            title="Click to cycle themes"
        >
            <span className="mr-1">🎨</span>
            <span
                className="w-4 h-4 rounded-full border border-black/10"
                style={{ backgroundColor: currentTheme.color }}
            />
            <span>{currentTheme.name}</span>
        </button>
    );
};

export default ThemeSwitcher;
