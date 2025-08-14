import { useState } from "react";
import { Edit, Trash2, Search, Plus, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Asset {
  id: string;
  itemCode: string;
  department: string;
  category: string;
  description: string;
  unitPrice: number;
  ticketCount: number;
}

interface AssetTableProps {
  selectedDepartment: string;
  selectedCategory: string;
}

const AssetTable = ({ selectedDepartment, selectedCategory }: AssetTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data
  const assets: Asset[] = [
    {
      id: "1",
      itemCode: "CashierComp1",
      department: "Cashier",
      category: "Hardware-PC Unit",
      description: "Intel Core i5 Computer",
      unitPrice: 18000,
      ticketCount: 2,
    },
    {
      id: "2", 
      itemCode: "ITLaptop1",
      department: "IT Department",
      category: "Hardware-PC Unit",
      description: "Dell Laptop i7 16GB RAM",
      unitPrice: 35000,
      ticketCount: 1,
    },
    {
      id: "3",
      itemCode: "OfficeChair1",
      department: "Administration",
      category: "Furniture",
      description: "Ergonomic Office Chair",
      unitPrice: 8500,
      ticketCount: 0,
    },
    {
      id: "4",
      itemCode: "SecurityCam1",
      department: "Security",
      category: "Security Equipment", 
      description: "IP Security Camera 4K",
      unitPrice: 12000,
      ticketCount: 3,
    },
  ];

  // Filter assets based on selections
  const filteredAssets = assets.filter((asset) => {
    const matchesDepartment = selectedDepartment === "All Departments" || asset.department === selectedDepartment;
    const matchesCategory = selectedCategory === "All Categories" || asset.category === selectedCategory;
    const matchesSearch = asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesCategory && matchesSearch;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedAssets = filteredAssets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">ASSET</h1>
        <h2 className="text-2xl text-muted-foreground">MANAGEMENT</h2>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="default" className="bg-primary hover:bg-primary-hover">
            <Plus className="w-4 h-4 mr-2" />
            ADD
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary-hover">
            <Upload className="w-4 h-4 mr-2" />
            BULK UPLOAD
          </Button>
          <Button variant="default" className="bg-primary hover:bg-primary-hover">
            <Download className="w-4 h-4 mr-2" />
            EXPORT
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-table-header hover:bg-table-header">
              <TableHead className="font-semibold text-foreground">ITEM CODE</TableHead>
              <TableHead className="font-semibold text-foreground">DEPARTMENT</TableHead>
              <TableHead className="font-semibold text-foreground">CATEGORY</TableHead>
              <TableHead className="font-semibold text-foreground">DESCRIPTION</TableHead>
              <TableHead className="font-semibold text-foreground">UNIT PRICE</TableHead>
              <TableHead className="font-semibold text-foreground">TICKET COUNT</TableHead>
              <TableHead className="font-semibold text-foreground">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedAssets.map((asset) => (
              <TableRow key={asset.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{asset.itemCode}</TableCell>
                <TableCell>{asset.department}</TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell>{asset.description}</TableCell>
                <TableCell>₱{asset.unitPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={asset.ticketCount > 0 ? "destructive" : "secondary"}>
                    {asset.ticketCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="w-4 h-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ‹
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className={currentPage === pageNum ? "bg-primary hover:bg-primary-hover" : ""}
              >
                {pageNum}
              </Button>
            );
          })}
          
          {totalPages > 5 && (
            <>
              <span className="text-muted-foreground">...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            ›
          </Button>
        </div>

        <Button variant="default" className="bg-primary hover:bg-primary-hover">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD TEMPLATE
        </Button>
      </div>
    </div>
  );
};

export default AssetTable;