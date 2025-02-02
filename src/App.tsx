import { ChangeEvent, Component } from 'react';
import { fetchItems } from './services/api';
import { Search } from './components/Search';
import { Character, TResponse } from './types';
import { List } from './components/List';
import styles from './App.module.scss';

type AppState = {
  searchValue: string;
  characters: Character[];
  isLoading: boolean;
  hasError: boolean;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isLoading: false,
      searchValue: localStorage.getItem('searchValue') ?? '',
      characters: [],
      hasError: false,
    };

    this.loadCharacters = this.loadCharacters.bind(this);
  }

  componentDidMount(): void {
    this.loadCharacters(this.state.searchValue);
  }

  componentDidUpdate(): void {
    if (this.state.hasError) throw new Error('Your bad =(');
  }

  private async loadCharacters(character: string) {
    try {
      this.setState((prev) => ({
        searchValue: prev.searchValue.trim(),
        isLoading: true,
      }));

      const { results } = await fetchItems<TResponse>(character);

      this.setState({ characters: results });
    } catch (error) {
      console.error('Failed to fetch characters:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  private searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
  };

  private throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    return (
      <div className={styles.app}>
        <Search
          value={this.state.searchValue}
          onChange={this.searchInputHandler}
          onSubmit={this.loadCharacters}
        />

        {this.state.isLoading ? (
          <h2 style={{ marginTop: '32px' }}>Loading...</h2>
        ) : (
          <List data={this.state.characters} />
        )}
        <button className={styles.button} onClick={this.throwError}>
          Generate error
        </button>
      </div>
    );
  }
}

export default App;
