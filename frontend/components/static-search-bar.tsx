import { Search } from "lucide-react";

interface StaticSearchBarProps {
    onSearchClick: () => void
}

const StaticSearchBar = ({ onSearchClick }: StaticSearchBarProps) => {
    return (
        <div
            role="button"
            onClick={onSearchClick}
            className="flex cursor-pointer items-center justify-between gap-2 px-3 py-2 rounded-md  hover:bg-gray-50 transition-colors shadow-sm"
        >
            <span className="text-gray-600 text-sm">Search posts...</span>
            <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-500" />
            </div>
        </div>
    )
}

export default StaticSearchBar;