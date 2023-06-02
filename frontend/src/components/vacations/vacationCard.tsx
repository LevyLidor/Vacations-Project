import { format } from "date-fns";
import { ComponentState, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InfoUser from "../../models/infoUser";
import VacationsModel from "../../models/vacations-model";
import vacationServices from "../../services/vacationServices";
import DeleteVacation from "./Admin/deleteVacation/deleteVacation";
import EditVacation from "./Admin/editVacation/editVacation";
import "./VacationCard.css";
import Role from "../../models/role";



const VacationCard = ({ imageName, startDate, endDate, description, price, destination, id, totalLikes, userLikes, refresh, setRefresh }: VacationsModel) => {

  const info: InfoUser = useSelector((state: ComponentState) => state.userReducer);
  const [follow, setFollow] = useState<boolean>(false);
  const btnClassName = follow ? 'follow-button-liked' : 'follow-button';

  async function toggleLike() {
    try {
      if (!follow) {
        await vacationServices.postFollowers(id);
        setFollow(true);
        setRefresh(!refresh);
      } else {
        await vacationServices.deleteFollowers(id);
        setFollow(false);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (userLikes == null) {
      setFollow(false);
    } else {
      setFollow(true);
    }

  }, [totalLikes])



  return (

    <div className="vacation-card" id={id.toString()}>
      <div className="vacation-image" style={{ backgroundImage: `url(http://localhost:3005/images/${imageName})` }}>

        {info?.user?.role == Role.User ?
          <button className={btnClassName} id={id.toString()} onClick={toggleLike}>
            {totalLikes} {follow === true ? "❤️" : "🤍"}
          </button>
          :

          <div className="adminBtns">
            <DeleteVacation id={id} refresh={refresh} setRefresh={setRefresh} />
            <EditVacation
              id={id}
              destination={destination}
              description={description}
              startDate={startDate}
              endDate={endDate}
              price={price}
              imageName={imageName}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          </div>
        }


      </div>

      <div className="vacation-dates">
        <p className="dates">{`📅 ${format(new Date(startDate), "dd/MM/yyyy")} - ${format(new Date(endDate), "dd/MM/yyyy")} 📅`} </p>
        <div className="destination" >{destination}</div>
      </div>

      <div className="vacation-description">
        <p className="description">{description}</p>
      </div>

      <div className="vacation-price">
        <p className="price">${price}</p>
      </div>

    </div >
  );
};

export default VacationCard;

