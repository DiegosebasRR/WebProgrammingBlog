import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Search from "../Search/Search";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <nav className={styles.navbar}>
          <img
            className={styles.logo}
            src="https://static.vecteezy.com/system/resources/previews/018/930/745/non_2x/twitter-logo-twitter-icon-transparent-free-free-png.png"
            alt=""
          />
          <ul className={styles.links}>
            <li className={styles.link}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.link}>
              <Link to="/category/6525abc9ca9eb86003f52388">HTMl</Link>
            </li>
            <li className={styles.link}>
              <Link to="/category/6525abedca9eb86003f5239e">CSS</Link>
            </li>
            <li className={styles.link}>
              <Link to="/category/6525ac21ca9eb86003f523a0">React</Link>
            </li>
            <li className={styles.link}>
              <Link to="/category/6525ac9dca9eb86003f523a4">React Native</Link>
            </li>
            <li className={styles.link}>
              <Link to="/category/6525ac56ca9eb86003f523a2">Node Js</Link>
            </li>
          </ul>
          <Search />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
