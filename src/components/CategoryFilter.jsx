import React from 'react';

const categories = ['Technology', 'Sports', 'Health', 'Business', 'Science', 'Entertainment'];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    return (
        <div className="flex justify-center flex-wrap gap-2 my-8">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-200 border ${
            selectedCategory === category
              ? "bg-secondary text-secondary-foreground border-secondary shadow-md"
              : "bg-card text-foreground border-border hover:bg-secondary hover:text-secondary-foreground hover:border-secondary hover:shadow-md"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
    );
};

export default CategoryFilter;
