import { useContext, useState } from "react"
import { assets } from '../../assets/assests.js'
import { AppContext } from '../../Context/AppContext.jsx'
import toast from "react-hot-toast";
import { addItem } from '../../Service/ItemService.js'
const ItemForm = () => {

    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: ""
    });
    const { categories, setItemsData, itemsData, setCategories } = useContext(AppContext);

    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('item', JSON.stringify(data));
        formData.append('file', image);
        try {
            if (!image) {
                toast.error("Select Image");
                return;
            }
            const response = await addItem(formData);
            if (response.status === 201) {
                setItemsData([...itemsData, response.data])
                setCategories((prevCategories) =>
                    prevCategories.map((category) => category.categoryId === data.categoryId ? { ...category, items: category.items + 1 } : category)
                )
                toast.success("Item Added");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    categoryId: "",
                })
                setImage(false);
            } else {
                toast.error("Unable to Add Item");
            }
        } catch (e) {
            console.error(e);
            toast.error("Unable to Add Item");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='item-form-container' style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', }}>
            <div className='mx-2 mt-2'>
                <div className='row'>
                    <div className='card col-md-12 form-container'>
                        <div className='card-body'>
                            <form onSubmit={onSubmitHandler}>
                                <div className='mb-3'>
                                    <label htmlFor="image" className='form-label'>
                                        <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48} />
                                    </label>
                                    <input type="file" name='image' id='image' className='form-control' hidden onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="name" className='form-label'>Name</label>
                                    <input type="text" name='name' id='name' className='form-control' placeholder='Item Name' onChange={onChangeHandler} value={data.name} required />
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label" htmlFor="category">
                                        Category
                                    </label>
                                    <select name="categoryId" id="categoryId" className='form-control' onChange={onChangeHandler} value={data.categoryId} required>
                                        <option value="">--Select Category--</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category.categoryId}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="price" className='form-label'>Price</label>
                                    <input type="number" name='price' id='price' className='form-control' placeholder='&#8377;200.00' onChange={onChangeHandler} value={data.price} required />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="descrption" className='form-label'>Description</label>
                                    <textarea name="description" id="description" className='form-control' placeholder='Write Content here...' rows="5" onChange={onChangeHandler} value={data.description}></textarea>
                                </div>
                                <button type='submit' className='btn btn-warning w-100' disabled={loading}>{loading ? "Loading..." : "Save"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemForm
