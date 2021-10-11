import React, { useState, useEffect, useContext} from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl'
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import PinIcon from "./PinIcon";
import context from '../context'
import Blog from './Blog'

const INTIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 13
}

const Map = ({ classes }) => {

  const {state, dispatch} = useContext(context)
  const [viewport, setViewport] = useState(INTIAL_VIEWPORT)
  const [userPosition, setUserPosition] = useState(null)
  useEffect(() => {
    getUserPosition()
  }, [])
  const getUserPosition = () => {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        setViewport({...viewport,latitude,longitude})
        setUserPosition({ latitude, longitude })
      })
    }
  }

  const handleMapClick = ({ lngLat, leftButton}) => {
    if(!leftButton) return
    if(!state.draft) {
      dispatch({ type: "CREATE_DRAFT"})
    }
    const [longitude, latitude] = lngLat
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: {longitude, latitude}
    })

  }
  
  return (
    <div className={classes.root}>
      <ReactMapGL
       width="100vw"
       height="calc(100vh - 64px)"
       mapStyle="mapbox://styles/mapbox/streets-v9"
       onClick={handleMapClick}
       mapboxApiAccessToken={process.env.REACT_APP_MAP_API}
       onViewportChange={viewport => setViewport(viewport)}
       {...viewport}>
        <div className={classes.navigationControl}>
          <NavigationControl 
            onViewportChange={viewport => setViewport(viewport)}/>
        </div>
        {/* Pin for User's Current Position */}
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            >
              <PinIcon size={40} color="red" />
            </Marker>
        )}
        {state.draft && (
           <Marker
           latitude={state.draft.latitude}
           longitude={state.draft.longitude}
           >
             <PinIcon size={40} color="hotpink" />
           </Marker>
        )}
      </ReactMapGL>

      {/* Blog Area to add pin Content */}

      <Blog />
    </div>);
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
