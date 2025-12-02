import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

interface FilterSidebarProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    priceRange: number[];
    onPriceChange: (value: number[]) => void;
}

export const FilterSidebar = ({
    categories,
    selectedCategories,
    onCategoryChange,
    priceRange,
    onPriceChange,
}: FilterSidebarProps) => {
    return (
        <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-24 transform rotate-1">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6 border-b-2 border-dashed border-graphite/30 pb-4">
                    <Filter className="w-5 h-5 text-blueHighlight" />
                    <h2 className="font-handwritten text-xl font-bold text-graphite">Filters</h2>
                </div>

                {/* Categories */}
                <div className="mb-8">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                        Categories
                    </h3>
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2 group">
                                <Checkbox
                                    id={category}
                                    checked={selectedCategories.includes(category)}
                                    onCheckedChange={() => onCategoryChange(category)}
                                    className="border-2 border-graphite data-[state=checked]:bg-blueHighlight data-[state=checked]:border-blueHighlight transition-all duration-300"
                                />
                                <Label
                                    htmlFor={category}
                                    className="font-handwritten text-lg cursor-pointer group-hover:text-blueHighlight transition-colors"
                                >
                                    {category}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                        Price Range
                    </h3>
                    <div className="px-2">
                        <Slider
                            defaultValue={[0, 1000]}
                            max={1000}
                            step={10}
                            value={priceRange}
                            onValueChange={onPriceChange}
                            className="py-4"
                        />
                    </div>
                    <div className="flex justify-between text-sm font-handwritten text-muted-foreground">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>

                {/* Decorative doodle */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 opacity-20 rotate-12">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M10,50 Q30,30 50,50 T90,50" />
                        <path d="M10,60 Q30,40 50,60 T90,60" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
