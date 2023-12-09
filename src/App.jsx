import About from "./components/About/About";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import css from './styles/app.module.scss';
const App = () => {
	return (
		<div className={`bg-primary ${css.container}`}>
			<Header />
			<Hero />
			<About />
		</div>
	)
};

export default App;