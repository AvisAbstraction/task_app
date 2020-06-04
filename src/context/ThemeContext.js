import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
let theme = createMuiTheme(require("../../src/theme.json"));
theme = responsiveFontSizes(theme);

export const AppThemeProvider = props => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
