import { NavLink } from "react-router-dom";
function AboutPage() {
  return (

    <div>
      <h1>Our mission</h1>
      <p>We intend to build the world's best search engine!</p>

      <h2>Our team</h2>
      
      <NavLink to="/search">Search the Web</NavLink>
    </div>
    
  );
}

export default AboutPage;
