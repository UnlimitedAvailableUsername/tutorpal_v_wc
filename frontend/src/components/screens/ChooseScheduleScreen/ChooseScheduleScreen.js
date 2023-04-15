import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createOrderSchedule } from '../../../features/redux/actions/scheduleOrderActions';
import { listSchedules } from '../../../features/redux/actions/scheduleAction';
import { Container } from 'react-bootstrap';
import LoadingIconBig from '../../elements/Loader/LoadingIconBig';

function ChooseScheduleScreen() {
  const [formData, setFormData] = useState({
    items: [],
    payment_method: 'PayPal',
  });

  const { tutorId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSchedules(tutorId));
  }, [dispatch, tutorId]);


  const { loading, error, success, schedules } = useSelector( (state) => state.scheduleList );

  const handleInputChange = (e, schedule) => {
    const { name, value, checked } = e.target;
  
    const items = [...formData.items];
    const itemIndex = items.findIndex((item) => item.schedule === schedule.id);
  
    if (name.startsWith('schedule_')) {
      if (!checked && itemIndex !== -1) {
        items.splice(itemIndex, 1);
        // clear the quantity input value
        const quantityInput = document.getElementsByName(`quantity_${schedule.id}`)[0];
        quantityInput.value = "0";
      } else if (checked && itemIndex === -1) {
        const newItem = {
          schedule: schedule.id,
          quantity: 1,
        };
        // If the input quantity was previously zero, set it to 1
        const quantityInput = document.getElementsByName(`quantity_${schedule.id}`)[0];
        if (quantityInput.value === "0") {
          quantityInput.value = "1";
          newItem.quantity = 1;
        }
        items.push(newItem);
      }
    } else if (name.startsWith('quantity_')) {
      const quantity = parseInt(value) || 0;
      if (quantity === 0) {
        if (itemIndex !== -1) {
          items.splice(itemIndex, 1);
        }
        const checkbox = document.getElementsByName(`schedule_${schedule.id}`)[0];
        checkbox.checked = false;
      } else {
        if (itemIndex === -1) {
          items.push({
            schedule: schedule.id,
            quantity,
          });
        } else {
          items[itemIndex].quantity = quantity;
        }
      }
    }
  
    setFormData({
      ...formData,
      items,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({
      ...formData,
      payment_method: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createOrderSchedule(formData))
  };

  const calculateTotalPrice = () => {
    return formData.items.reduce((total, item) => {
      const { schedule } = item;
      const selectedSchedule = schedules.find((s) => s.id === schedule);
      const quantity = item.quantity; // default to 1 if quantity is not set
      return total + parseFloat(selectedSchedule.price) * quantity;
    }, 0);
  };

  return (
    <div>
      <Container>
        <h1>Choose among the schedules:</h1>
        {loading ? (
            <LoadingIconBig />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            {schedules && schedules.map((schedule) => (
              <div key={schedule.id}>
                <label>
                  <input
                    type="checkbox"
                    name={`schedule_${schedule.id}`}
                    onChange={(e) => handleInputChange(e, schedule)}
                  />
                  {schedule.name} - ${schedule.price} ({schedule.count_in_stock}{' '}
                  available)
                </label>
                <input
                  type="number"
                  name={`quantity_${schedule.id}`}
                  min={0}
                  max={schedule.count_in_stock}
                  disabled={!formData.items.some((item) => item.schedule === schedule.id) && !formData.items.find((item) => item.schedule === schedule.id)?.quantity}
                  defaultValue={formData.items.find((item) => item.schedule === schedule.id)?.quantity ?? (formData.items.some((item) => item.schedule === schedule.id) ? 1 : '')}
                  onChange={(e) => handleInputChange(e, schedule)}
                />
              </div>
            ))}
            <div>
              <label>
                <input
                  type="radio"
                  name="payment_method"
                  value="PayPal"
                  checked={formData.payment_method === 'PayPal'}
                  onChange={handlePaymentMethodChange}
                />
                PayPal
              </label>
            </div>
            <div>
              <button type="submit" disabled={!formData.items.length}>
                Place Order - Total Price: ${calculateTotalPrice()}
              </button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
}

export default ChooseScheduleScreen;
