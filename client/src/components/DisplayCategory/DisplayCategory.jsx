import { assets } from '../../assets/assests'
import Category from '../Category/Category'
import './DisplayCategory.css'



const DisplayCategory = ({ categories, selectedCategories, setSelectedCategories }) => {
    return (
        <div className='row g-3' style={{ width: '100%', margin: "0" }}>
            <div key="all" className='col-md-3 col-sm-6' style={{ padding: '0 10px' }}>
                <Category
                    categoryName="All items"
                    imgUrl={assets.device}
                    numberOfItems={categories.reduce((acc, cat) => acc + cat.items, 0)}
                    bgColor="#6c757d"
                    isSelected={selectedCategories === ""}
                    onClick={() => setSelectedCategories("")}
                />
            </div>
            {
                categories.map(category => (
                    <div key={category.categoryId} className='col-md-3 col-sm-6' style={{ padding: '0 10px' }}>
                        <Category
                            categoryName={category.name}
                            imgUrl={category.imgUrl}
                            numberOfItems={category.items}
                            bgColor={category.bgColor}
                            isSelected={selectedCategories === category.categoryId}
                            onClick={() => setSelectedCategories(category.categoryId)}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayCategory
