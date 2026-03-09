import { useContext, useState } from 'react'
import './Explore.css'
import { AppContext } from '../../Context/AppContext'
import DisplayCategory from '../../components/DisplayCategory/DisplayCategory';
import DisplayItems from '../../components/DisplayItem/DisplayItems';
import CustomerForm from '../../components/CustomerForm/CustomerForm';
import CartItems from '../../components/CartItems/CartItems';
import CartSummary from '../../components/CartSummary/CartSummary';

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  return (
    <div className='explore-container text-light'>
      <div className='left-column'>
        <div className='first-row' style={{ overflowY: 'auto' }}>
          <DisplayCategory
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories} />
        </div>
        <hr className='horizontal-line' />
        <div className='second-row' style={{ overflowY: 'auto' }}>
          <DisplayItems selectedCategory={selectedCategories} />
        </div>
      </div>
      <div className='right-column d-flex flex-column h-100'>

        <div className='customer-form-container'>
          <CustomerForm
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </div>

        <hr className='my-3 text-light' />

        <div className='cart-items-container flex-grow-1 overflow-auto'>
          <CartItems />
        </div>

        <div className='cart-summary-container'>
          <CartSummary
            customerName={customerName}
            mobileNumber={mobileNumber}
            setCustomerName={setCustomerName}
            setMobileNumber={setMobileNumber}
          />
        </div>

      </div>
    </div>
  )
}

export default Explore
