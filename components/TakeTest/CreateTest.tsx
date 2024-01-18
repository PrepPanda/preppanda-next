import React, { useState, ChangeEvent } from "react";
import axios from "axios";

// Define a type for the form data
interface FormData {
  standard: "11th" | "12th";
  subjects: string[];
  totalQuestions: string;
}

const CreateTest: React.FC = () => {
  // Generate an array of options for totalQuestions
  const totalQuestionsOptions = Array.from(
    { length: 16 },
    (_, index) => (index + 3) * 10
  );

  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    standard: "11th",
    subjects: [],
    totalQuestions: "30",
  });

  // Handler function to update form data
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // If the input is the subjects checkboxes, handle multiple selections
    if (name === "subjects") {
      const selectedSubject = value;

      setFormData((prevFormData) => {
        const isSelected = prevFormData.subjects.includes(selectedSubject);

        if (isSelected) {
          // If the subject is already selected, remove it
          return {
            ...prevFormData,
            subjects: prevFormData.subjects.filter(
              (subject) => subject !== selectedSubject
            ),
          };
        } else {
          // If the subject is not selected, add it
          return {
            ...prevFormData,
            subjects: [...prevFormData.subjects, selectedSubject],
          };
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const [msg, setMsg] = useState("");
  const [myData, setMyData] = useState({
    standard: "",
    subjects: [],
    totalQuestions: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      axios
        .post("api/take_test/create", formData)
        .then(function (response) {
          console.log(response.data);
          setMsg(response.data.message);
          setMyData(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      // console.log("Test created successfully:", response.data);

      setFormData({
        standard: "11th",
        subjects: [],
        totalQuestions: "30",
      });
    } catch (error: any) {
      console.error("Error creating test:", error.message);
    }

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="my-[8.8rem] max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Standard:</label>
          <select
            name="standard"
            value={formData.standard}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Subjects:</label>
          <div>
            {/* Checkboxes for subjects */}
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="subjects"
                value="physics"
                checked={formData.subjects.includes("physics")}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2">Physics</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="subjects"
                value="chemistry"
                checked={formData.subjects.includes("chemistry")}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2">Chemistry</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                name="subjects"
                value="maths"
                checked={formData.subjects.includes("maths")}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2">Maths</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="subjects"
                value="biology"
                checked={formData.subjects.includes("biology")}
                onChange={handleInputChange}
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <span className="ml-2">Biology</span>
            </label>
            {/* Add more subjects as needed */}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Total Questions:
          </label>
          <div className="flex items-center">
            <input
              type="range"
              name="totalQuestions"
              min="30"
              max="180"
              step="10"
              value={formData.totalQuestions}
              onChange={handleInputChange}
              className="w-full appearance-none slider-thumb:-webkit-slider-thumb slider-thumb:active:bg-gray-300 slider-thumb:focus:bg-gray-300 slider-thumb:hover:bg-gray-300 slider-thumb:disabled:bg-gray-300 slider-thumb:hover:border-gray-300"
            />
            <span className="ml-2">{formData.totalQuestions}</span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Create Test
        </button>
      </form>
      <div>{msg}</div>
      <div>{myData.standard}</div>
      <div>
        {myData.subjects.map((sub) => (
          <div key={sub}>{sub}</div>
        ))}
      </div>
      <div>{myData.totalQuestions}</div>
    </div>
  );
};

export default CreateTest;
