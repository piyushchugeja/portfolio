import About from "./components/About/About";
import Education from "./components/Education/Education";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import WorkExperience from "./components/WorkExperience/WorkExperience";
import css from './styles/app.module.scss';
const App = () => {
	return (
		<div className={`bg-primary ${css.container}`}>
			<Header />
			<Hero />
			<About />
			<Education />
			<WorkExperience	/>
		</div>
	)
};

export default App;