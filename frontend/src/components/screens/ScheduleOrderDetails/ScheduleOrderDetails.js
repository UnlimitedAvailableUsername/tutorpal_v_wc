import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ScheduleOrderDetails({ match }) {

  const scheduleOrderId = match.params.id;
  const dispatch = useDispatch();

  const scheduleOrderState = useSelector((state) => state.scheduleOrderState);
  const { scheduleOrder, error, loading } = scheduleOrderState;

  const userState = useSelector((state) => state.userState);
  const { userInfo } = userState;




  return (
    <div>ScheduleOrderDetails</div>
  )
}

export default ScheduleOrderDetails