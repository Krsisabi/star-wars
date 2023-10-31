import { ChangeEvent, Component } from 'react';
import { Search } from './components/Search';
import { Character, TResponse } from './types';
import { List } from './components/List';
import styles from './App.module.scss';

const BASE_URL = 'https://swapi.dev/api/people/';

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

    this.fetchCharacters = this.fetchCharacters.bind(this);
  }

  componentDidMount(): void {
    this.fetchCharacters(this.state.searchValue);
  }

  componentDidUpdate(): void {
    if (this.state.hasError) throw new Error('Your bad =(');
  }

  private async fetchCharacters(character: string) {
    this.setState((prev) => ({ ...prev, isLoading: true }));
    const url = character ? `${BASE_URL}?search=${character}` : BASE_URL;
    const res = await fetch(url);
    this.setState((prev) => ({ ...prev, isLoading: false }));
    const data = (await res.json()) as TResponse;
    const { results } = data;
    this.setState((prev) => ({ ...prev, characters: results }));
  }

  private searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState((prev) => ({ ...prev, searchValue: e.target.value }));
  };

  private throwError = () => {
    this.setState((prev) => ({ ...prev, hasError: true }));
  };

  render() {
    return (
      <div className={styles.app}>
        <button className={styles.button} onClick={this.throwError}>
          Generate error
        </button>
        <Search
          value={this.state.searchValue}
          onChange={this.searchInputHandler}
          onSubmit={this.fetchCharacters}
        />
        {this.state.isLoading ? (
          <h2 style={{ marginTop: '32px' }}>Loading...</h2>
        ) : (
          <List data={this.state.characters} />
        )}
      </div>
    );
  }
}

export default App;
