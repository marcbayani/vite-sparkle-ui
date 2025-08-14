import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSidebarProps {
  selectedDepartment: string;
  selectedCategory: string;
  onDepartmentChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const FilterSidebar = ({
  selectedDepartment,
  selectedCategory,
  onDepartmentChange,
  onCategoryChange,
}: FilterSidebarProps) => {
  const departments = [
    "All Departments",
    "Cashier",
    "IT Department", 
    "Security",
    "Administration",
    "Warehouse"
  ];

  const categories = [
    "All Categories",
    "Hardware-PC Unit",
    "Furniture",
    "Security Equipment",
    "Office Supplies",
    "Software"
  ];

  return (
    <aside className="w-64 bg-sidebar-bg border-r border-border p-6 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
          Filter by Department
        </h3>
        <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground mb-2 uppercase tracking-wide">
          Filter by Category
        </h3>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </aside>
  );
};

export default FilterSidebar;