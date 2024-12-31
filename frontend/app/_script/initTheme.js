function setTheme() {
    try {
      let theme;
      if (window.localStorage.getItem("theme")) {
        theme = JSON.parse(window.localStorage.getItem("theme"));
      } else {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      const themeStyles = themes[theme];
      for (let key in themeStyles) {
        setVariables(key, themeStyles[key]);
      }
      document.body.dataset.theme = theme;
    } catch (e) {
        console.log(e)
    }
  }
  setTheme();