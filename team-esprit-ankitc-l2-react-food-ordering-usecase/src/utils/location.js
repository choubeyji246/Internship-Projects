import getResponse from "./GetResponse";

const fetchLocation =async () => {
  let data = new Promise((res,rej) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      data = await getLocation(latitude, longitude);
      console.log("fetchloc",data);
      res(data)
    });
  })
  return data
    
  };


  const getLocation = async (lat, long) => {
    let location = await getResponse(
      "get",
      `https://api.opencagedata.com/geocode/v1/json?q= + ${lat} + + + ${long} + &key=d604fdb01fa844eca0b309b690234b3b`,
      {}
    );
    console.log(location);
    const {road, city, postcode} = location.data.results[0].components;
    console.log(road,city,postcode);
    return {road, city, postcode} ;
  };

  export default fetchLocation