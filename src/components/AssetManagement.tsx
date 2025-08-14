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
      <div className="p-6 space-y-4">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">ASSET</h1>
          <h2 className="text-2xl text-muted-foreground">MANAGEMENT</h2>
        </div>
      </div>
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