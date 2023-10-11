// Dashboard.tsx
import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import FormCategory from "../../components/FormCategory/FormCategory";
import FormArticle from "../../components/FormArticle/FormArticle";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.options}>
        <button
          className={`${styles.optionButton} ${
            selectedOption === "option1" ? styles.activeOption : ""
          }`}
          onClick={() => handleOptionChange("option1")}
        >
          Option 1
        </button>
        <button
          className={`${styles.optionButton} ${
            selectedOption === "option2" ? styles.activeOption : ""
          }`}
          onClick={() => handleOptionChange("option2")}
        >
          Option 2
        </button>
      </div>

      <div className={styles.content}>
        {selectedOption === "option1" ? (
          <div className={styles.option1Content}>
            <h2>Option 1 Content</h2>
            <FormCategory />
          </div>
        ) : (
          <div className={styles.option2Content}>
            <h2>Option 2 Content</h2>
            <FormArticle />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
