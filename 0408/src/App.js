// import logo from './logo.svg';
// import './App.css';
import './Counter'  // 이 줄이 없어도 된다. 
import Counter from './Counter';  // 이렇게 counter,js를 import해줘야 화면에 표현 가능하다.

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Counter />
  );
}

export default App;