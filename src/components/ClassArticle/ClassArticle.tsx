import styles from "./ClassArticle.module.css";

const ClassArticle = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Project Structure</h1>
      <p className={styles.text}>
        Your new Astro project generated from the create astro CLI wizard
        already includes some files and folders. Others, you will create
        yourself and add to Astro’s existing file structure.
      </p>
      <h2 className={styles.subtitle}>Directories and Files</h2>
      <p className={styles.text}>
        Astro leverages an opinionated folder layout for your project. Every
        Astro project root should include the following directories and files:
      </p>
      <h2 className={styles.subtitle}>Section titled src/components</h2>
      <p className={styles.text}>
        Components are reusable units of code for your HTML pages. These could
        be Astro components, or UI framework components like React or Vue. It is
        common to group and organize all of your project components together in
        this folder. This is a common convention in Astro projects, but it is
        not required. Feel free to organize your components however you like!
      </p>
    </div>
  );
};

export default ClassArticle;
