import { useState } from "react";
import Interests from "./Interests";
import Profile from "./Profile";
import Settings from "./Settings";

const TabForm = () => {
  // Persistent data state
  const [data, setData] = useState({
    name: "suksham",
    age: "20",
    email: "shi@gmail.com",
    interests: ["coding", "music"], // Array of interests
  });

  const [errors, setErrors] = useState({
    name: "Name is not valid",
  });

  const [activeTab, setActiveTab] = useState(0); // Active tab state

  const tabs = [
    {
      name: "Profile",
      component: Profile,
      validate: () => {
        const err = {};
        if (!data.name || data.name < 2) {
          err.name = "name is not valid";
        }
      },
    },
    { name: "Interests", component: Interests },
    { name: "Settings", component: Settings },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  const handleNextClick = () => setActiveTab((prev) => prev + 1);
  const handlePrevClick = () => setActiveTab((prev) => prev - 1);
  const handleSubmitClick = () => console.log(data);

  return (
    <div>
      <div className="heading-container">
        {tabs.map((t, index) => (
          <div
            key={index}
            className="heading"
            onClick={() => setActiveTab(index)}
          >
            {t.name}
          </div>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
      {activeTab < tabs.length - 1 && (
        <button onClick={handleNextClick}>Next</button>
      )}
      {activeTab === tabs.length - 1 && (
        <button onClick={handleSubmitClick}>Submit</button>
      )}
    </div>
  );
};

export default TabForm;
