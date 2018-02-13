import React from 'react';

const ThemeContext = React.createContext('light');
class ThemeProvider extends React.Component {
  state = { theme: 'light' };

  toggleTheme = () => {
    this.setState({ theme: this.state.theme === 'light' ? 'dark' : 'light' });
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{ value: this.state.theme, toggleTheme: this.toggleTheme }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
const ThemeConsumer = ThemeContext.Consumer;

const LanguageContext = React.createContext('en');

class LanguageProvider extends React.Component {
  state = { lang: 'en' };

  toggleLang = () => {
    this.setState({ lang: this.state.lang === 'en' ? 'ru' : 'en' });
  };

  render() {
    return (
      <LanguageContext.Provider
        value={{ lang: this.state.lang, toggleLang: this.toggleLang }}
      >
        {this.props.children}
      </LanguageContext.Provider>
    );
  }
}
const LanguageConsumer = LanguageContext.Consumer;

const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);

function AppProviders({ children }) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
}

function ThemeAndLanguageConsumer({ children }) {
  console.log(children);
  return (
    <LanguageConsumer>
      {language => (
        <ThemeConsumer>
          {theme => children({ ...language, ...theme })}
        </ThemeConsumer>
      )}
    </LanguageConsumer>
  );
}

export class Example extends React.Component {
  render() {
    return (
      <AppProviders>
        <ThemeAndLanguageConsumer>
          {({ value, lang, toggleTheme, toggleLang }) => {
            return (
              <div>
                <div onClick={toggleTheme}>{value} and </div>
                <div onClick={toggleLang}>and {lang}</div>
              </div>
            );
          }}
        </ThemeAndLanguageConsumer>
      </AppProviders>
    );
  }
}
