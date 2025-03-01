import React, { useEffect, useState } from 'react'
import Navbar from '../../components/input/Navbar'
import { data, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard';

const Home = () => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState(null)
  const [allStories, setAllStories] = useState([]);

  // Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all travel stories
  const getAllTravelStories = async () => {
    try{
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    }catch (error) {
      console.log("An unexpected error occurred. please try again");
    }
  }

  //handle edit story click
  const handleEdit = (data) => {}

  //handle travel story click
  const handleViewStory = (data) => {}

  //handle update favourite 
  const updateIsFavourite = (data) => {
    const storyId = storyData._id;

    try{
        
    }catch (error) {
      console.log("An unexpected error occurred. please try again");
    }
  }

  useEffect(() => {
    getAllTravelStories();
    getUserInfo();
  }, []);

  return (
    <>
        <Navbar userInfo={userInfo} />
        <div className='container mx-auto py-10'>
          <div className='flex gap-7 '>
            <div className='flex-1'>
              {allStories.length > 0 ? (
                <div className='grid grid-cols-2 gap-4'>
                    {allStories.map((item) => {
                      return (
                        <TravelStoryCard 
                        key={item._id} 
                        imgUrl={item.imgUrl}
                        title={item.title}
                        story={item.story}
                        date={item.visitedDate}
                        visitedLocation={item.visitedLocation}
                        isFavourite={item.isFavourite}
                        onEdit={() => handleEdit(item)}
                        onClick={() => handleViewStory(item)}
                        onFavouriteClick={() => updateIsFavourite(item)}
                        />
                      );
                    })}
                </div>
              ) : (
                <p>No stories available.</p>
              )}
            </div>
            <div className='w-[320px]'></div>
          </div>
        </div>
    </>
  );
};

export default Home;