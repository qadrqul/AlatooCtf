import React from 'react';
import searchIcon from "../../assets/svg/search-icon.svg";

const CategoryFilter = ({selectedCategory, searchCategory, onChangeCategory, onChangeSearch}) => {
    return (
        <div className="category">
            <p className="category__category-title">Category Filter</p>

            <div className="category__buttons"
                 onChange={onChangeCategory}>
                <div className="category__radio-block">
                    <input
                        id="All"
                        type="radio"
                        name="category"
                        value=""
                        checked={selectedCategory === ""}
                        onChange={e => e}
                    />
                    <label htmlFor="All">All</label>
                </div>
                <div className="category__radio-block">
                    <input
                        id="Codebreakers"
                        type="radio"
                        name="category"
                        value="Codebreakers"
                    />
                    <label htmlFor="Codebreakers">Codebreakers</label>
                </div>
                <div className="category__radio-block">
                    <input
                        id="First-Timers"
                        type="radio"
                        name="category"
                        value="First-Timers"
                    />
                    <label htmlFor="First-Timers">First-Timers</label>
                </div>
            </div>

            <div className="category__search">
                <div className="category__search-block">
                    <label>Search by Title</label>
                    <input
                        type="text"
                        className="category__search-input"
                        value={searchCategory}
                        onChange={onChangeSearch}
                    />

                    <img
                        src={searchIcon}
                        alt="searchIcon"
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;