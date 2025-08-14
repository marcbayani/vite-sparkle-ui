import { useState } from "react";
import Header from "./Header";
import FilterSidebar from "./FilterSidebar";
import AssetTable from "./AssetTable";

const AssetManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <FilterSidebar
          selectedDepartment={selectedDepartment}
          selectedCategory={selectedCategory}
          onDepartmentChange={setSelectedDepartment}
          onCategoryChange={setSelectedCategory}
        />
        <AssetTable
          selectedDepartment={selectedDepartment}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default AssetManagement;