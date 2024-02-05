import defaultTheme from "tailwindcss/defaultTheme";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                "navy-blue": "#242633",
                "light-gray": "#F4F8FF",
                "light-purple": "#A8B4DD",
            },

            screens: {
                "3xl": "2000px",
            },
        },
    },

};