import("tailwindcss").Config;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        100: "#e0f6d4",
        200: "#c2eeaa",
        300: "#a3e57f",
        400: "#85dd55",
        500: "#66d42a",
        600: "#52aa22",
        700: "#3d7f19",
        800: "#295511",
        900: "#142a08",
      },
      secondary: {
        100: "#d4e0f6",
        200: "#aac2ee",
        300: "#7fa3e5",
        400: "#5585dd",
        500: "#2a66d4",
        600: "#2252aa",
        700: "#193d7f",
        800: "#112955",
        900: "#08142a",
      },
      accent: {
        100: "#f6d4e0",
        200: "#eeaac2",
        300: "#e57fa3",
        400: "#dd5585",
        500: "#D42A66",
        600: "#bf265c",
        700: "#941d47",
        800: "#6a1533",
        900: "#400d1f",
      },
      danger: {
        100: "#ffd0d6",
        200: "#ffa1ae",
        300: "#ff7285",
        400: "#ff435d",
        500: "#FF1434",
        600: "#cc102a",
        700: "#990c1f",
        800: "#660815",
        900: "#33040a",
      },
      grid: {
        black: "#222", //0
        sapphire: "#2A66D4", //1
        blue: "#2BCEFF", //2
        grey: "#444", //3
        cyan: "#53DEF7", //4
        mint: "#56D576", //5
        green: "#5ED62E", //6
        purple: "#AB40B7", //7
        apple: "#AEEB20", //8
        white: "#EEE", //9
        pink: "#FA30A3", //A
        gold: "#FECD0C", //B
        yellow: "#FEF711", //C
        red: "#FF1434", //D
        amber: "#FF641D", //E
        orange: "#FF991D", //F
        clear: "rgba(0,0,0,0)",
      },
    },
    extend: {
      transform: ["hover", "focus", "rotate"],
    },
  },
};
